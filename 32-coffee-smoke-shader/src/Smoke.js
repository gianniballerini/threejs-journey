import { Color, DoubleSide, Mesh, PlaneGeometry, RepeatWrapping, ShaderMaterial } from "three";
import { Settings } from "./Settings";
import coffeeSmokeFragmentShader from "./shaders/coffeeSmoke/fragment.glsl";
import coffeeSmokeVertexShader from "./shaders/coffeeSmoke/vertex.glsl";


class Smoke
{
    constructor(parent)
    {
        this.parent = parent
        this.geometry = new PlaneGeometry(1, 1, 16, 64)
        this.geometry.translate(0, 0.5, 0)
        this.geometry.scale(1.5, 6, 1.5)

        this.perlinTexture = this.parent.textureLoader.load('./perlin.png')
        this.perlinTexture.wrapS = RepeatWrapping
        this.perlinTexture.wrapT = RepeatWrapping

        this.smokeColor = new Color(Settings.smokeColor)

        this.material = new ShaderMaterial({
            wireframe: Settings.smokeWireframe,
            vertexShader: coffeeSmokeVertexShader,
            fragmentShader: coffeeSmokeFragmentShader,
            side: DoubleSide,
            transparent: true,
            depthWrite: false,
            uniforms: {
                uPerlinTexture: { value: this.perlinTexture },
                uTime: { value: 0 },
                uSmokeSpeed: { value: Settings.smokeSpeed },
                uSmokeColor: { value: this.smokeColor },
                uSmokeThreshold: { value: Settings.smokeThreshold },
                uTwistStrength: { value: Settings.twistStrength },
                uTwistFrequency: { value: Settings.twistFrequency },
                uTwistSpeed: { value: Settings.twistSpeed },
                uLeftEdge: { value: Settings.leftEdge },
                uRightEdge: { value: Settings.rightEdge },
                uTopEdge: { value: Settings.topEdge },
                uBottomEdge: { value: Settings.bottomEdge }
            }

        })


        this.mesh = new Mesh(this.geometry, this.material)

        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.position.y = 1.83;

        this.parent.scene.add(this.mesh)
    }

    update(elapsedTime)
    {
        this.smokeColor.set(Settings.smokeColor)
        this.material.uniforms.uTime.value = elapsedTime

        this.material.wireframe = Settings.smokeWireframe
        this.material.uniforms.uSmokeSpeed.value = Settings.smokeSpeed
        this.material.uniforms.uSmokeColor.value = this.smokeColor
        this.material.uniforms.uSmokeThreshold.value = Settings.smokeThreshold

        this.material.uniforms.uTwistStrength.value = Settings.twistStrength
        this.material.uniforms.uTwistFrequency.value = Settings.twistFrequency
        this.material.uniforms.uTwistSpeed.value = Settings.twistSpeed

        this.material.uniforms.uLeftEdge.value = Settings.leftEdge
        this.material.uniforms.uRightEdge.value = Settings.rightEdge
        this.material.uniforms.uTopEdge.value = Settings.topEdge
        this.material.uniforms.uBottomEdge.value = Settings.bottomEdge
    }
}

export { Smoke };

