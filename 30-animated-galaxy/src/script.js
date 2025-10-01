import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Galaxy } from './Galaxy'
import { TweakPane } from './Tweakpane'



class App
{
    constructor()
    {
        this.canvas = document.querySelector('canvas.webgl')
        this.scene = new Scene()
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.camera = new PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.renderer = new WebGLRenderer({
            canvas: this.canvas
        })
        this.galaxy = new Galaxy(this)
        this.pane = new TweakPane(this.galaxy.generateGalaxy.bind(this.galaxy))
    }
    init()
    {
        this.camera.position.set(3, 3, 3)
        this.scene.add(this.camera)

        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = true

        this.galaxy.init()
    }

    resize()
    {
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()
    }

    update(elapsedTime)
    {
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        this.galaxy.update(elapsedTime)
    }
}

const app = new App()
app.init()

window.addEventListener('resize', app.resize.bind(app))


/**
 * Animate
 */
const clock = new Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    app.update(elapsedTime)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
