import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ModelLoader {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
    }

    loadModel(path, position = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 }) {
        this.loader.load(
            path,
            (gltf) => {
                const model = gltf.scene;
                model.position.set(position.x, position.y, position.z);
                model.scale.set(scale.x, scale.y, scale.z);
                this.scene.add(model);
                console.log('Model loaded:', model);
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }
}
