export function handleOptions(sketch) {
   const toggleBtn = document.querySelector('.options-bar-btn')
   const optionsBar = document.querySelector('.options-bar')
   const bodyEl = document.querySelector('body')

   toggleBtn.addEventListener('click', e => {
     bodyEl.classList.toggle('options-bar--open')
   })

   // Axis
   const axisBars = {
      uXAxis: '.x-axis-range-input',
      uYAxis: '.y-axis-range-input',
      uZAxis: '.z-axis-range-input',
   }

   Object.keys(axisBars).forEach(key => {
      const bar = optionsBar.querySelector(axisBars[key])
      const valueSpan = bar.parentNode.querySelector('span.value')
      if (!bar) return 

      bar.addEventListener('input', e => {
         const val = e.target.value 

         valueSpan.innerHTML = val
         sketch.material.uniforms[key].value = val * 2
      })
   })
}