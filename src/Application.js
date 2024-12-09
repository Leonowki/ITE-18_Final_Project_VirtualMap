import { SceneSetup } from './SceneSetup.js';
import { ModelLoader } from './ModelLoader.js';

export class Application {
    constructor() {
        this.sceneSetup = new SceneSetup();
        this.heroBuilding = new ModelLoader(this.sceneSetup.scene);
        this.kinaadmanBuilding = new ModelLoader(this.sceneSetup.scene);
        this.libraryBuilding = new ModelLoader(this.sceneSetup.scene);
        this.csuOval = new ModelLoader(this.sceneSetup.scene);
        this.hinangBuilding = new ModelLoader(this.sceneSetup.scene);
        this.init();
    }
    
    init() {
        this.heroBuilding.loadModel('/assets/3d_models/new_admin_building.glb', { x: -120, y: -0.1, z: -60 },{ x: 1.3, y: 1.3, z: 1.3 });
        this.kinaadmanBuilding.loadModel('/assets/3d_models/kinaadman_building.glb',{ x: -120, y: -0.34, z: -240},{ x: 1.2, y: 1.2, z: 1.2 });
        this.libraryBuilding.loadModel('/assets/3d_models/library_building.glb',{ x: 119, y: 0.4, z: 120 },{ x: 0.4, y: 0.4, z: 0.4 },{ x: 0, y: Math.PI/1.5, z: 0 });
        this.csuOval.loadModel('/assets/3d_models/csu_oval.glb',{ x: 30, y: 1, z: -280},{ x: 0.6, y: 0.6, z: 0.6 },{ x: 0, y:Math.PI, z: 0 });
        this.hinangBuilding.loadModel('/assets/3d_models/hinang_building.glb',{ x: -40, y: 0, z: -450},{ x: 1.1, y: 1.1, z: 1.1 });

        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.sceneSetup.controls.update();
        this.sceneSetup.render();
        
    }
}
