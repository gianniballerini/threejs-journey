import { Mesh, MeshStandardMaterial, SRGBColorSpace } from "three"

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
        this.mapTexture = this.textureLoader.load('/models/LeePerrySmith/color.jpg')
        this.mapTexture.colorSpace = SRGBColorSpace
        this.normalTexture = this.textureLoader.load('/models/LeePerrySmith/normal.jpg')

        // Material
        this.material = new MeshStandardMaterial( {
            map: this.mapTexture,
            normalMap: this.normalTexture
        })

        this.gltfLoader.load(
            '/models/LeePerrySmith/LeePerrySmith.glb',
            (gltf) =>
            {
                // Model
                this.model = gltf.scene.children[0]
                this.model.rotation.y = Math.PI * 0.5
                this.model.material = this.material
                this.scene.add(this.model)

                // Update materials
                this.updateAllMaterials()
            }
        )
    }

    update(elapsedTime)
    {
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
