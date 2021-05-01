export function handleInputs(sketch) {
   const equationForm = document.querySelector('.equation-form')
   const equationInput = equationForm.querySelector('.equation-input')
   
   equationForm.addEventListener('submit', (e) => {
      // Stop the page from refreshing
      e.preventDefault()

      // Reset time
      sketch.lastTime = sketch.threeClock.getElapsedTime()

      // Pass the input into the shader
      const filteredValue = filterRawInput(equationInput.value)
      
      // Update the vertexShader on the next frame
      requestAnimationFrame(() => {
         sketch.material.needsUpdate = true
         sketch.material.vertexShader = sketch.vertexShader(filteredValue)
      })
   })
}


function filterRawInput(raw) {
   let filtered = raw

   filtered = filtered.replace(/X/g, 'scaledUv.x')
   filtered = filtered.replace(/Y/g, 'scaledUv.y')
   filtered = filtered.replace(/TIME/g, 'uTime')

   filtered = filtered.replace(/[1-9]\d*(\.\d+)?/g, (n) => { 
      return n.includes('.') ? n : `${n}.0` 
   })

   console.log(filtered)

   return filtered
}