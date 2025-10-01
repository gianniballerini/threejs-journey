import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Points, ShaderMaterial } from "three"
import { Settings } from "./Settings"
import galaxyFragmentShader from "./shaders/galaxy/fragment.glsl"
import galaxyVertexShader from "./shaders/galaxy/vertex.glsl"

class Galaxy {
    constructor(parent) {
        this.scene = parent.scene
        this.renderer = parent.renderer
        this.geometry = null
        this.material = null
        this.points = null
    }

    init() {
        this.generateGalaxy()
    }

    generateGalaxy() {
        if(this.points !== null)
        {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.points)
        }

        /**
         * Geometry
         */
        this.geometry = new BufferGeometry()

        const positions = new Float32Array(Settings.count * 3)
        const colors = new Float32Array(Settings.count * 3)
        const scales = new Float32Array(Settings.count * 1)
        const randomness = new Float32Array(Settings.count * 3)

        const insideColor = new Color(Settings.insideColor)
        const outsideColor = new Color(Settings.outsideColor)

        for(let i = 0; i < Settings.count; i++)
        {
            const i3 = i * 3

            // Position
            const radius = Math.random() * Settings.radius

            const branchAngle = (i % Settings.branches) / Settings.branches * Math.PI * 2


            const randomX = Math.pow(Math.random(), Settings.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * Settings.randomness * radius
            const randomY = Math.pow(Math.random(), Settings.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * Settings.randomness * radius
            const randomZ = Math.pow(Math.random(), Settings.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * Settings.randomness * radius

            randomness[i3    ] = randomX
            randomness[i3 + 1] = randomY
            randomness[i3 + 2] = randomZ

            positions[i3    ] = Math.cos(branchAngle) * radius
            positions[i3 + 1] = 0
            positions[i3 + 2] = Math.sin(branchAngle) * radius

            // Color
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / Settings.radius)

            colors[i3    ] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            // Scale
            scales[i] = Math.random()
        }

        this.geometry.setAttribute('position', new BufferAttribute(positions, 3))
        this.geometry.setAttribute('color', new BufferAttribute(colors, 3))
        this.geometry.setAttribute('aScale', new BufferAttribute(scales, 1))
        this.geometry.setAttribute('aRandomness', new BufferAttribute(randomness, 3))
        /**
         * Material
         */
        this.material = new ShaderMaterial({
            depthWrite: false,
            blending: AdditiveBlending,
            vertexColors: true,
            vertexShader: galaxyVertexShader,
            fragmentShader: galaxyFragmentShader,
            uniforms: {
                uSize: { value: 30 * this.renderer.getPixelRatio() },
                uTime: { value: 0 }
            }
        })

        /**
         * Points
         */
        this.points = new Points(this.geometry, this.material)
        this.scene.add(this.points)
    }

    update(elapsedTime)
    {
        this.material.uniforms.uTime.value = elapsedTime
    }
}

export { Galaxy }

