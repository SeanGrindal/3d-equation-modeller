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
   // Remove all whitespace
   let filtered = raw.replace(/\s/g, '')

   // Handle ^ powers
   // const matched = filtered.match(/([0-9A-Za-z.]*)(\^)([0-9.]*)/g)
   // if (matched) {
   //    matched.forEach(match => {
   //       const sides = match.split('^')
   
   //       filtered = filtered.replace(match, `pow(${sides[0]}, ${sides[1]})`)
   //    })
   // }

   // Hanlde X, Y, and TIME variables
   filtered = filtered.replace(/x|X/g, 'scaledUv.x')
   filtered = filtered.replace(/y|Y/g, 'scaledUv.y')
   filtered = filtered.replace(/time|TIME/g, 'uTime')

   // Float numbers for GLSL
   filtered = filtered.replace(/(\d*\.)?\d+/g, (n) => { 
      return n.includes('.') ? n : `${n}.0` 
   })

   return filtered
}