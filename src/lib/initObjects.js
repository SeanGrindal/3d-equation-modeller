import * as THREE from 'three'

function buildAxis( src, dst, color) {
   const geometry = new THREE.BufferGeometry()
   const material = new THREE.LineBasicMaterial({ linewidth: 1, color: color, linecap: 'round' });

   const vertices = new THREE.BufferAttribute( new Float32Array(6), 3 )
   const points = [...dst, ...src]

   for (let i = 0; i < 2; i++) {
      let i3 = i*3
      vertices.setXYZ(i, points[i3], points[i3 + 1], points[i3 + 2])
   }

   geometry.setAttribute( 'position', vertices)

   return new THREE.Line( geometry, material, THREE.LineSegments )
}

export function initObjects(sketch) {
   // Hanlde Axis 
   const xAxis = buildAxis(
      [ -1.5, 0, 0 ],
      [ 1.5, 0, 0 ],
      0x0000FF,
  )

   const yAxis = buildAxis(
      [ 0, 0, -1.5 ],
      [ 0, 0, 1.5 ],
      0xFF0000,
   )

   const zAxis = buildAxis(
      [ 0, -1.05, 0 ],
      [ 0, 1.05, 0 ],
      0x000000,
   )

   sketch.scene.add(xAxis)
   sketch.scene.add(yAxis)
   sketch.scene.add(zAxis)

   // Handle Plane
   const properties = {
      xAxis: 10,
      yAxis: 10,
      zAxis: 10
   }

   sketch.vertexShader = (func) => `
      varying vec2 vUv;
      varying vec3 vPos;

      uniform float uTime;
      uniform float uXAxis;
      uniform float uYAxis;
      uniform float uZAxis;

      void main() {
         vec3 pos = position;

         vec2 scaledUv = uv;
         scaledUv.x = (uv.x - 0.5) * uXAxis;
         scaledUv.y = (uv.y - 0.5) * uYAxis;

         // Equation for Z elevation
         ${func ? `pos.z += (${func}) / (uZAxis * 0.5);` : ''}

         vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );

         gl_Position = projectionMatrix * mvPosition;

         vPos = pos;
         vUv = uv;
   }`

   const planeGeometry = new THREE.PlaneBufferGeometry(3, 3, 1024, 1024 );
   sketch.material = new THREE.ShaderMaterial({ 
      vertexShader: sketch.vertexShader('sin(scaledUv.x) + cos(scaledUv.y + uTime)'),
      fragmentShader: `
         varying vec2 vUv;
         varying vec3 vPos;

         varying float vElevation;

         void main() {
            vec3 color = mix(vec3(vUv.x, 1.0, vUv.y), vec3(vUv.x, 0.0, 1.0), vPos.z * 2.0);

            gl_FragColor = vec4(color, 1.0);
         }
      `,
      side: THREE.DoubleSide,
      uniforms: {
         uTime: { value: 0 },
         uXAxis: { value: properties.xAxis },
         uYAxis: { value: properties.yAxis },
         uZAxis: { value: properties.zAxis }
      }
   })

   const mesh = new THREE.Mesh(planeGeometry, sketch.material)
   mesh.rotation.set(-Math.PI / 2, 0, 0)

   sketch.scene.add(mesh)
}