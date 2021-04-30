import { onWindowResize } from './events/onWindowResize'

export function initEvents(sketch) {
   sketch.onWindowResize = () => {
      onWindowResize(sketch)
   }

   window.addEventListener('resize', sketch.onWindowResize)
}