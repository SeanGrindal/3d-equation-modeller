import * as THREE from 'three'

export function initCamera(sketch) {
   sketch.camera = new THREE.PerspectiveCamera(35, sketch.sizes.width / sketch.sizes.height, 0.1, 15)
   sketch.camera.position.set(0, 0.5, 4)
   sketch.scene.add(sketch.camera)
}