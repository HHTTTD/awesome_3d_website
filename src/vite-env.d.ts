/// <reference types="vite/client" />

declare module 'three/examples/jsm/controls/OrbitControls.js' {
  import { Camera } from 'three'
  import { EventDispatcher } from 'three'
  export class OrbitControls extends EventDispatcher {
    constructor(camera: Camera, domElement?: HTMLElement)
    enableDamping: boolean
    dampingFactor: number
    autoRotate: boolean
    autoRotateSpeed: number
    enableZoom: boolean
    update(): boolean
  }
}
declare module 'gsap'
