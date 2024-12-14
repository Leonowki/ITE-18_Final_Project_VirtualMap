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
        this.treesModel = new ModelLoader(this.sceneSetup.scene);
        this.oldAdminBuilding = new ModelLoader(this.sceneSetup.scene);
        this.backAdminBuilding = new ModelLoader(this.sceneSetup.scene);
        this.oldCasBuilding = new ModelLoader(this.sceneSetup.scene);
        
        this.init();
    }

    //param(model,scale,rotate)
    init() {
        this.heroBuilding.loadModel('/assets/3d_models/new_admin_building.glb', { x: -49, y: -1, z: -45 },{ x: 0.45, y: 0.45, z: 0.45},{ x: 0, y: Math.PI/(-1.8), z: 0 });
        this.kinaadmanBuilding.loadModel('/assets/3d_models/kinaadman_building.glb',{ x: 23, y: -1, z: -50},{ x: 0.45, y: 0.45, z: 0.45 },{ x: 0, y: Math.PI/(-2), z: 0 });
        this.libraryBuilding.loadModel('/assets/3d_models/library_building.glb',{ x: -100, y: -0.5, z: 25 },{ x: 0.15, y: 0.15, z: 0.15 },{ x: 0, y: Math.PI/4, z: 0 });
        this.csuOval.loadModel('/assets/3d_models/csu_oval.glb',{ x: 30, y: -1, z: 0},{ x: 0.22, y: 0.22, z: 0.22},{ x: 0, y:Math.PI/2, z: 0 });
        this.hinangBuilding.loadModel('/assets/3d_models/hinang_building.glb',{ x: 93, y: -1, z: -25},{ x: 0.5, y: 0.5, z: 0.5 },{ x: 0, y:Math.PI/(-2), z: 0 });
        this.oldAdminBuilding.loadModel('assets/3d_models/old_admin_building.glb',{ x: -30, y: -0.6, z: -13},{ x: 0.27, y: 0.27, z: 0.27},{ x: 0, y:Math.PI/(-2), z: 0 });
        this.backAdminBuilding.loadModel('assets/3d_models/back_admin_building.glb',{ x: -57, y: 0, z: -78 },{ x: 0.35, y: 0.35, z:0.35},{ x: 0, y:Math.PI/(-2), z: 0 });
        this.oldCasBuilding.loadModel('assets/3d_models/old_cas_building.glb',{ x: 40, y: -1, z:32 },{ x: 0.63, y: 0.63, z:0.63},{ x: 0, y:Math.PI, z:0 });
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.sceneSetup.controls.update();
        this.sceneSetup.render();
        
    }
}
