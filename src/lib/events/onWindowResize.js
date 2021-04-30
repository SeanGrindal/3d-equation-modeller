export function onWindowResize(sketch) {
   // Updates sizes
   sketch.sizes.width = window.innerWidth
   sketch.sizes.height = window.innerHeight

   // Update camera
   sketch.camera.aspect = sketch.sizes.width / sketch.sizes.height
   sketch.camera.updateProjectionMatrix() 

   // Update renderer 
   sketch.renderer.setSize(sketch.sizes.width, sketch.sizes.height)
   sketch.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}  
