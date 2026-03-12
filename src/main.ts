import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

// Scene
const scene = new THREE.Scene()

// Sphere (3D ball )
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: 0x5819b5,
  roughness: 0.6,
 // metalness: 0.6,
  
})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights (MeshStandardMaterial must have light)
const ambientLight = new THREE.AmbientLight(0xffffff, 0)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 80)
pointLight.position.set(0, 6, 6)
scene.add(pointLight)

// จุดที่แสงตกกระทบ
/*const lightHitMarker = (() => {
  const sphereCenter = new THREE.Vector3(0, 0, 0)
  const dir = new THREE.Vector3()
    .subVectors(pointLight.position, sphereCenter)
    .normalize()
  const hitPoint = dir.multiplyScalar(3)

  const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16)
  const markerMaterial = new THREE.MeshBasicMaterial({
    color: 0xffdd44,
    transparent: true,
    opacity: 0.95,
  })
  const marker = new THREE.Mesh(markerGeometry, markerMaterial)
  marker.position.copy(hitPoint)
  scene.add(marker)
  return marker
})()*/

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 8

// Renderer
const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000)

// OrbitControls (หมุนดูด้วยเมาส์)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.autoRotate = true
controls.autoRotateSpeed = 1.5
controls.enableZoom = false  // ปิด scroll ย่อ/ขยาย

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// GSAP animation (เหมือนในคลิป - เล่นกับ sphere)
gsap.to(sphere.rotation, {
  y: Math.PI * 2,
  duration: 8,
  repeat: -1,
  ease: 'none',
})

// Mouse move - โฮเวอร์แล้ว sphere ขยายนิดหน่อย (ใช้ GSAP)
/*canvas.addEventListener('mousemove', (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1
  gsap.to(sphere.scale, {
    x: 1 + Math.abs(x) * 0.1,
    y: 1 + Math.abs(x) * 0.1,
    z: 1 + Math.abs(x) * 0.1,
    duration: 0.3,
  })
})

canvas.addEventListener('mouseleave', () => {
  gsap.to(sphere.scale, { x: 1, y: 1, z: 1, duration: 0.5 })
})*/

// Animation loop
function tick() {
  requestAnimationFrame(tick)
  controls.update()
  renderer.render(scene, camera)
}
tick()
