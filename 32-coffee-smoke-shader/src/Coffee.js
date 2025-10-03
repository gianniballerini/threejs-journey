import { Smoke } from "./Smoke"

class Coffee
{
    constructor( parent )
    {
        this.scene = parent.scene
        this.renderer = parent.renderer
        this.gltfLoader = parent.gltfLoader
        this.textureLoader = parent.textureLoader
        this.model = null

        this.gltfLoader.load(
            './bakedModel.glb',
            (gltf) =>
            {
                this.model = gltf.scene.children[0]
                gltf.scene.getObjectByName('baked').material.map.anisotropy = 8
                this.scene.add(gltf.scene)
            }
        )

        this.smoke = new Smoke(this)
    }

    update(elapsedTime)
    {
        this.smoke.update(elapsedTime)
    }
}

export { Coffee }
