import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function initControls(sketch) {
   sketch.controls = new OrbitControls(sketch.camera, sketch.canvas)
   sketch.controls.enablePan = false
   sketch.controls.minDistance = 1.2
   sketch.controls.maxDistance = 7
   sketch.controls.enableDamping = true
}
