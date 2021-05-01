import './style.scss'

import * as THREE from 'three'

import { initCamera } from './lib/initCamera'
import { initObjects } from './lib/initObjects'
import { initEvents } from './lib/initEvents'
import { initControls } from './lib/initControls'

import { handleInputs } from './lib/handleInputs'
import { handleOptions } from './lib/handleOptions'

class Sketch {
    constructor() {
        this.sizes = {
            width: window.innerWidth, 
            height: window.innerHeight
        }

        this.canvas = document.querySelector('canvas.webgl')
        this.renderer = new THREE.WebGLRenderer({
           canvas: this.canvas,
           alpha: true,
           antialias: true,
           precision: 'lowp'
        })

        this.renderer.debug.checkShaderErrors = false

        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.scene = new THREE.Scene()

        this.lastTime = 0
        this.threeClock = new THREE.Clock()

        initCamera(this)
        initObjects(this)
        initEvents(this)
        initControls(this)

        handleInputs(this)
        handleOptions(this)

        this.tick()
    }

    tick() {
        this.elapsedTime = this.threeClock.getElapsedTime() - this.lastTime
    
        this.controls.update()
    
        this.renderer.render(this.scene, this.camera)

        this.updateRequest = window.requestAnimationFrame(this.tick.bind(this))

        this.material.uniforms.uTime.value = this.elapsedTime
    }

    destroy() {
        cancelAnimationFrame(this.updateRequest)

        this.threeClock = null
        this.scene = null
        this.renderer = null

        window.removeEventListener('resize', this.onWindowResize)
    }
}

const sketch = new Sketch()
