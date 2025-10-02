import { Mesh, MeshDepthMaterial, MeshStandardMaterial, RGBADepthPacking, SRGBColorSpace } from "three"
import { Settings } from "./Settings"

class Head
{
    constructor( parent )
    {
        this.scene = parent.scene
        this.renderer = parent.renderer
        this.gltfLoader = parent.gltfLoader
        this.textureLoader = parent.textureLoader
        this.model = null

        // Textures
        this.mapTexture = this.textureLoader.load('./models/LeePerrySmith/color.jpg')
        this.mapTexture.colorSpace = SRGBColorSpace
        this.normalTexture = this.textureLoader.load('./models/LeePerrySmith/normal.jpg')

        // Material
        this.material = new MeshStandardMaterial( {
            map: this.mapTexture,
            normalMap: this.normalTexture
        })

        this.depthMaterial = new MeshDepthMaterial({
            depthPacking: RGBADepthPacking,
            opacity: 1
        })

        this.custom_uniforms = {
            uTime: { value: 0 },
            uAngle: { value: Settings.angle },
            uSine: { value: Settings.sine }
        }

        this.material.onBeforeCompile = ( shader ) =>
        {
            shader.uniforms.uTime = this.custom_uniforms.uTime
            shader.uniforms.uAngle = this.custom_uniforms.uAngle
            shader.uniforms.uSine = this.custom_uniforms.uSine

            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>',
                `
                    #include <common>

                    uniform float uTime;
                    uniform float uAngle;
                    uniform bool uSine;

                    mat2 get2dRotateMatrix(float angle)
                    {
                        float s = sin(angle);
                        float c = cos(angle);
                        return mat2(c, -s, s, c);
                    }
                `
            )

            shader.vertexShader = shader.vertexShader.replace(
                '#include <beginnormal_vertex>',
                `
                    #include <beginnormal_vertex>

                    float angle = uSine ? sin(position.y + uTime) * uAngle : position.y + uTime;
                    mat2 rotateMatrix = get2dRotateMatrix(angle);

                    objectNormal.xz = rotateMatrix * objectNormal.xz;
                `
            )


            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                    #include <begin_vertex>

                    transformed.xz = rotateMatrix * transformed.xz;
                `
            )

        }

        this.depthMaterial.onBeforeCompile = ( shader ) =>
        {
            shader.uniforms.uTime = this.custom_uniforms.uTime
            shader.uniforms.uAngle = this.custom_uniforms.uAngle
            shader.uniforms.uSine = this.custom_uniforms.uSine

            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>',
                `
                    #include <common>

                    uniform float uTime;
                    uniform float uAngle;
                    uniform bool uSine;

                    mat2 get2dRotateMatrix(float angle)
                    {
                        float s = sin(angle);
                        float c = cos(angle);
                        return mat2(c, -s, s, c);
                    }
                `
            )
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                    #include <begin_vertex>

                    float angle = uSine ? sin(position.y + uTime) * uAngle : position.y + uTime;
                    mat2 rotateMatrix = get2dRotateMatrix(angle);

                    transformed.xz = rotateMatrix * transformed.xz;
                `
            )
        }

        this.gltfLoader.load(
            './models/LeePerrySmith/LeePerrySmith.glb',
            (gltf) =>
            {
                // Model
                this.model = gltf.scene.children[0]
                this.model.rotation.y = Math.PI * 0.5
                this.model.material = this.material
                this.model.customDepthMaterial = this.depthMaterial
                this.scene.add(this.model)

                // Update materials
                this.updateAllMaterials()
            }
        )
    }

    update(elapsedTime)
    {
        this.custom_uniforms.uTime.value = elapsedTime
        this.custom_uniforms.uAngle.value = Settings.angle
        this.custom_uniforms.uSine.value = Settings.sine
    }

    updateAllMaterials()
    {
        this.scene.traverse((child) =>
        {
            if(child instanceof Mesh && child.material instanceof MeshStandardMaterial)
            {
                child.material.envMapIntensity = 1
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }
}

export { Head }
