import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ModelLoader {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
    }

    loadModel(path, position = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 }, rotate = { x: 0, y: 0, z: 0 }) {
        this.loader.load(
            path,
            (glb) => {
                const model = glb.scene;
    
                // Apply transformations to the root model
                model.position.set(position.x, position.y, position.z);
                model.rotation.set(rotate.x, rotate.y, rotate.z);
                model.scale.set(scale.x, scale.y, scale.z);
    
                // // Optional: Ensure child meshes also inherit scaling
                // model.traverse((child) => {
                //     if (child.isMesh) {
                //         child.castShadow = true; // Optional: Shadow configuration
                //         child.receiveShadow = true; // Optional: Shadow configuration
                //     }
                // });
    
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
