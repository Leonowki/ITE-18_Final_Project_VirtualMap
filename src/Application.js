import { SceneSetup } from './SceneSetup.js';
import { ModelLoader } from './ModelLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { MeshBasicMaterial, Mesh,Raycaster,Vector2,Color } from 'three';

export class Application {
    constructor() {
        //font
        this.fontLoader = new FontLoader();
        //scene
        this.sceneSetup = new SceneSetup();
        //models
        this.heroBuilding = new ModelLoader(this.sceneSetup.scene);
        this.kinaadmanBuilding = new ModelLoader(this.sceneSetup.scene);
        this.libraryBuilding = new ModelLoader(this.sceneSetup.scene);
        this.csuOval = new ModelLoader(this.sceneSetup.scene);
        this.hinangBuilding = new ModelLoader(this.sceneSetup.scene);
        this.treesModel = new ModelLoader(this.sceneSetup.scene);
        this.oldAdminBuilding = new ModelLoader(this.sceneSetup.scene);
        this.backAdminBuilding = new ModelLoader(this.sceneSetup.scene);
        this.oldCasBuilding = new ModelLoader(this.sceneSetup.scene);
        //text interactable
        this.textMeshes = [];
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
        this.init();
        this.addEventListers();
    }

    //param(model,scale,rotate) for models
    
    init() {
        this.fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
        //models
        this.heroBuilding.loadModel('/assets/3d_models/new_admin_building.glb', { x: -49, y: -1, z: -45 },{ x: 0.45, y: 0.45, z: 0.45},{ x: 0, y: Math.PI/(-1.8), z: 0 });
        this.addText("Hero Building",{ x: -57, y: 10, z: -45 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.kinaadmanBuilding.loadModel('/assets/3d_models/kinaadman_building.glb',{ x: 23, y: -1, z: -50},{ x: 0.45, y: 0.45, z: 0.45 },{ x: 0, y: Math.PI/(-2), z: 0 });
        this.addText("Kinaadman Building",{ x: 13, y: 10, z: -50},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.libraryBuilding.loadModel('/assets/3d_models/library_building.glb',{ x: -100, y: -0.5, z: 25 },{ x: 0.15, y: 0.15, z: 0.15 },{ x: 0, y: Math.PI/4, z: 0 });
        this.addText("Library Building",{ x: -110, y: 10, z: 25 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.csuOval.loadModel('/assets/3d_models/csu_oval.glb',{ x: 30, y: -1, z: 0},{ x: 0.22, y: 0.22, z: 0.22},{ x: 0, y:Math.PI/2, z: 0 });
        this.addText("CSU's Oval",{ x: -30, y: 10, z: 25},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.hinangBuilding.loadModel('/assets/3d_models/hinang_building.glb',{ x: 93, y: -1, z: -25},{ x: 0.5, y: 0.5, z: 0.5 },{ x: 0, y:Math.PI/(-2), z: 0 });
        this.addText("Hinang Building",{ x: 80, y: 12, z: -25},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.oldAdminBuilding.loadModel('assets/3d_models/old_admin_building.glb',{ x: -30, y: -0.6, z: -13},{ x: 0.27, y: 0.27, z: 0.27},{ x: 0, y:Math.PI/(-2), z: 0 });
        this.addText("Old Admin Building",{ x: -30, y: 10, z: -25},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.backAdminBuilding.loadModel('assets/3d_models/back_admin_building.glb',{ x: -57, y: 0, z: -78 },{ x: 0.35, y: 0.35, z:0.35},{ x: 0, y:Math.PI/(-2), z: 0 });
        this.addText("Back Admin Building",{ x: -70, y: 10, z: -78 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.oldCasBuilding.loadModel('assets/3d_models/old_cas_building.glb',{ x: 40, y: -1, z:32 },{ x: 0.63, y: 0.63, z:0.63},{ x: 0, y:Math.PI, z:0 });
        this.addText("Old Cas Building",{ x: 40, y: 10, z:32 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.animate();
    }

    addText(text, position,rotate) {
        this.fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) =>{
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: 2,        
                depth: 0.1,    
                curveSegments: 12,
                bevelEnabled: false,              
            });
    
            const textMaterial = new MeshBasicMaterial({ color: 0xffffff }); 
            const textMesh = new Mesh(textGeometry, textMaterial);
            textMesh.position.set(position.x, position.y, position.z);
            textMesh.rotation.set(rotate.x,rotate.y,rotate.z);
            textMesh.name = text
            this.sceneSetup.scene.add(textMesh); 
            this.textMeshes.push(textMesh);
        });
    }
    addEventListers(){
        window.addEventListener('mousemove',event => this.onMouseMove(event));
        window.addEventListener('click', (event) => this.onMouseClick(event));
        const closeButton = document.getElementById('close-info');
        closeButton.addEventListener('click', () => this.closeInfoPanel());
    }

    onMouseMove(event){
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Perform raycasting
        this.raycaster.setFromCamera(this.mouse, this.sceneSetup.camera);
        const intersects = this.raycaster.intersectObjects(this.textMeshes);

        // Reset all text colors
        this.textMeshes.forEach((mesh) => {
            mesh.material.color.set(0xffffff); // Default color
        });

        if (intersects.length > 0) {
            // Highlight the first intersected text
            intersects[0].object.material.color.set(0x127300); // Hover color
        }
    }

    onMouseClick(event) {
        // Normalize mouse position
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Perform raycasting
        this.raycaster.setFromCamera(this.mouse, this.sceneSetup.camera);
        const intersects = this.raycaster.intersectObjects(this.textMeshes);

        if (intersects.length > 0) {
            const clickedMesh = intersects[0].object;
            const buildingName = clickedMesh.name; // Name of the clicked building

            // Populate the info panel
            const infoPanel = document.getElementById('building-info');
            const title = document.getElementById('building-title');
            const description = document.getElementById('building-description');

            title.textContent = buildingName;
            description.textContent = `More details about ${buildingName}. Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum.`;

            // Show the info panel
            infoPanel.classList.remove('hidden');
            infoPanel.style.display = 'block'; // Ensure it's visible
        }
    }

    closeInfoPanel() {
        const infoPanel = document.getElementById('building-info');
        infoPanel.classList.add('hidden');
        infoPanel.style.display = 'none';
    }
        
    animate() {
        requestAnimationFrame(() => this.animate());
        this.sceneSetup.controls.update();
        this.sceneSetup.render();
        
    }
}
