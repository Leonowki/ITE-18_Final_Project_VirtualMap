import { SceneSetup } from './SceneSetup.js';
import { ModelLoader } from './ModelLoader.js';

export class Application {
    constructor() {
        this.sceneSetup = new SceneSetup();
        this.modelLoader = new ModelLoader(this.sceneSetup.scene);
        this.init();
    }

    init() {
        this.modelLoader.loadModel('/assets/3d_models/new_admin_building.glb', { x: -90, y: 0, z: 0 });
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.sceneSetup.controls.update();
        this.sceneSetup.render();
    }
}
