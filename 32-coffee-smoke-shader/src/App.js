import {
    DirectionalLight,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Coffee } from './Coffee'
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
        this.camera = new PerspectiveCamera(25, this.sizes.width / this.sizes.height, 0.1, 100)

        this.controls = new OrbitControls(this.camera, this.canvas)

        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        this.gltfLoader = new GLTFLoader()

        // this.set_lights()

        this.coffee = new Coffee(this)
        this.pane = new TweakPane(this)
    }

    init()
    {
        this.camera.position.x = 8
        this.camera.position.y = 10
        this.camera.position.z = 12
        this.scene.add(this.camera)

        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.controls.target.y = 3
        this.controls.enableDamping = true
    }

    update(elapsedTime)
    {
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        this.coffee.update(elapsedTime)
    }

    set_lights()
    {
        this.directionalLight = new DirectionalLight('#ffffff', 3)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.mapSize.set(1024, 1024)
        this.directionalLight.shadow.camera.far = 15
        this.directionalLight.shadow.normalBias = 0.05
        this.directionalLight.position.set(0.25, 2, - 2.25)
        this.scene.add(this.directionalLight)

    }

    resize()
    {
        // Update sizes
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight

        // Update camera
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()

        // Update renderer
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
}

export { App }
