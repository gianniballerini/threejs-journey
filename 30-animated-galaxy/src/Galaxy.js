import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Points, PointsMaterial } from "three"
import { Settings } from "./Settings"

class Galaxy {
    constructor(scene) {
        this.scene = scene
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

            positions[i3    ] = Math.cos(branchAngle) * radius + randomX
            positions[i3 + 1] = randomY
            positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

            // Color
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / Settings.radius)

            colors[i3    ] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b
        }

        this.geometry.setAttribute('position', new BufferAttribute(positions, 3))
        this.geometry.setAttribute('color', new BufferAttribute(colors, 3))

        /**
         * Material
         */
        this.material = new PointsMaterial({
            size: Settings.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: AdditiveBlending,
            vertexColors: true
        })

        /**
         * Points
         */
        this.points = new Points(this.geometry, this.material)
        this.scene.add(this.points)
    }
}

export { Galaxy }

