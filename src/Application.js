import { SceneSetup } from './SceneSetup.js';
import { ModelLoader } from './ModelLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { MeshBasicMaterial, Mesh,Raycaster,Vector2} from 'three';

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
        this.hirayaBuilding = new ModelLoader(this.sceneSetup.scene);
        this.nsbBuilding = new ModelLoader(this.sceneSetup.scene);

        this.cedBuilding = new ModelLoader(this.sceneSetup.scene);
        this.caaBuilding = new ModelLoader(this.sceneSetup.scene);
        this.hostelBuilding = new ModelLoader(this.sceneSetup.scene);
        this.masawaBuilding = new ModelLoader(this.sceneSetup.scene);
        this.villaresBuilding = new ModelLoader(this.sceneSetup.scene);
        this.loadingScreen();//handles fade out
        this.buildingImage();//images in infor
        //text interactable
        this.textMeshes = [];
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
        this.init();
        this.addEventListers();
    }

    //param(model,scale,rotate) for models
    init() {

        
        this.fontLoader.load('/assets/font/Roboto Condensed_Regular.json');
        //models
        this.heroBuilding.loadModel('/assets/3d_models/new_admin_building.glb', { x: -50, y: -0.7, z: -45 },{ x: 0.45, y: 0.45, z: 0.45},{ x: 0, y: Math.PI/(-2), z: 0 });
        this.addText("Hero Building",{ x: -57, y: 10, z: -45 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.kinaadmanBuilding.loadModel('/assets/3d_models/kinaadman_building.glb',{ x: 23, y: -1, z: -50},{ x: 0.45, y: 0.45, z: 0.45 },{ x: 0, y: Math.PI/(-2), z: 0 });
        this.addText("Kinaadman Building",{ x: 13, y: 10, z: -50},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.libraryBuilding.loadModel('/assets/3d_models/library_building.glb',{ x: -100, y: -0.4, z: 25 },{ x: 0.15, y: 0.15, z: 0.15 },{ x: 0, y: Math.PI/4, z: 0 });
        this.addText("Library Building",{ x: -100, y: 11, z: 30 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.csuOval.loadModel('/assets/3d_models/csu_oval.glb',{ x: 30, y: -1, z: 0},{ x: 0.22, y: 0.22, z: 0.22},{ x: 0, y:Math.PI/2, z: 0 });
        this.addText("CSU's Oval",{ x: -30, y: 10, z: 25},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.hinangBuilding.loadModel('/assets/3d_models/hinang_building.glb',{ x: 93, y: -1, z: -25},{ x: 0.6, y: 0.5, z: 0.5 },{ x: 0, y:Math.PI/(-2), z: 0 });
        this.addText("Hinang Building",{ x: 80, y: 12, z: -30},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.oldAdminBuilding.loadModel('assets/3d_models/old_admin_building.glb',{ x: -30, y: -0.6, z: -13},{ x: 0.27, y: 0.27, z: 0.27},{ x: 0, y:Math.PI/(-2), z: 0 });
        this.addText("Old Admin Building",{ x: -30, y: 10, z: -25},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.backAdminBuilding.loadModel('assets/3d_models/back_admin_building.glb',{ x: -57, y: 0, z: -78 },{ x: 0.35, y: 0.35, z:0.35},{ x: 0, y:Math.PI/(-2), z: 0 });
        this.addText("Back Admin Building",{ x: -70, y: 10, z: -78 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.oldCasBuilding.loadModel('assets/3d_models/old_cas_building.glb',{ x: 40, y: -1, z:32 },{ x: 0.63, y: 0.63, z:0.63},{ x: 0, y:Math.PI, z:0 });
        this.addText("Old Cas Building",{ x: 40, y: 10, z:32 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.hirayaBuilding.loadModel('/assets/3d_models/hiraya_building.glb',{ x: 65, y: -1, z: -27},{ x: 0.6, y: 0.44, z: 0.44},{ x: 0, y: Math.PI/-2, z: 0});
        this.addText("Hiraya Building",{ x: 63, y: 15, z: -32},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.nsbBuilding.loadModel('/assets/3d_models/nsb_building.glb',{ x: -100, y: -0.5, z: -12},{ x: 0.65, y: 0.65, z: 0.65},{ x: 0, y: Math.PI/-2, z: 0});
        this.addText("Batok Building",{ x: -99, y: 10, z: -42},{ x: Math.PI/-2.8, y: 0, z: 0 });
        
        this.cedBuilding.loadModel('/assets/3d_models/ced_building.glb',{ x: -180, y: 0, z: -40},{ x: 1.5, y: 1.5, z: 1.5},{ x: 0, y: Math.PI, z: 0});
        this.addText("Iwag Building",{ x: -180, y: 10, z: -40},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.hostelBuilding.loadModel('/assets/3d_models/hostel_building.glb',{ x: -135,y: 0, z: -95 } ,{ x: 1.4, y: 1.4, z: 1.4 });
        this.addText("Hostel Building",{ x: -135,y: 10, z: -95 },{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.caaBuilding.loadModel('/assets/3d_models/caa_building.glb',{ x: -180, y: 0, z: 60},{ x: -1.4, y: 1.4, z: 2 },{ x: 0, y: 0, z: 0});
        this.addText("CAA Building",{ x: -180, y: 10, z: 60},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.masawaBuilding.loadModel('/assets/3d_models/masawa_building.glb',{ x: 65, y: 0, z: -103}, {x: 1, y: 0.7, z: 0.7 },{ x: 0, y:Math.PI/-2, z: 0});
        this.addText("Masawa Building",{ x: 60, y: 12, z: -102},{ x: Math.PI/-2.8, y: 0, z: 0 });
        this.villaresBuilding.loadModel('/assets/3d_models/villares_building.glb',{ x: 196, y: 0, z: 17},{x: 1.2, y: 1, z: 1 },{ x: 0, y:Math.PI, z: 0});
        this.addText("Villares Building",{ x: 196, y: 5, z: 17},{ x: Math.PI/-2.8, y: 0, z: 0 });

        this.animate();
    }

    loadingFacts(){
        fetch('/assets/Information/facts.json') // Adjusted path
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const funFacts = data.facts;
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            const funFactElement = document.getElementById('fun-fact');
            if (funFactElement) {
                funFactElement.textContent = randomFact;
            }
        })
        .catch(error => console.error('Error loading fun facts:', error));
    }
    

    loadingScreen(){
        this.loadingFacts();
    
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('fade-out'); // Add fade-out class
            setTimeout(() => {
                
                loadingScreen.style.display = 'none'; 
            }, 2000); 
        }, 5000);        

    }
    //floating text
    addText(text, position) {
        this.fontLoader.load('assets/font/Roboto Condensed_Regular.json', (font) =>{
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: 1.5,        
                depth:1,    
                curveSegments: 12,
                bevelEnabled: false,              
            });
    
            const textMaterial = new MeshBasicMaterial({ color: 0xffffff}); 
            const textMesh = new Mesh(textGeometry, textMaterial);
            textMesh.position.set(position.x, position.y, position.z);
            textMesh.name = text
            this.sceneSetup.scene.add(textMesh); 
            this.textMeshes.push(textMesh);
        });
    }

    //interactables
    addEventListers(){
        window.addEventListener('mousemove',event => this.onMouseMove(event));
        window.addEventListener('click', (event) => this.onMouseClick(event));
        const closeButton = document.getElementById('close-info');
        closeButton.addEventListener('click', () => this.closeInfoPanel());
    }

    onMouseMove(event){
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        
        this.raycaster.setFromCamera(this.mouse, this.sceneSetup.camera);
        const intersects = this.raycaster.intersectObjects(this.textMeshes);

        
        this.textMeshes.forEach((mesh) => {
            mesh.material.color.set(0xF3F3F3); // Default color
        });

        if (intersects.length > 0) {
            
            intersects[0].object.material.color.set(0x127300); // Hover color
        }
    }

    onMouseClick(event) {
        
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        
        this.raycaster.setFromCamera(this.mouse, this.sceneSetup.camera);
        const intersects = this.raycaster.intersectObjects(this.textMeshes);
    
        if (intersects.length > 0) {
            const clickedMesh = intersects[0].object;
            const buildingName = clickedMesh.name; 
    
            this.buildingImage(buildingName);
            fetch('/assets/Information/buildings.json')
                .then(response => response.json())
                .then(data => {
                    // Check if the building exists in the JSON
                    const buildingData = data.buildings[buildingName];
                    if (buildingData) {
                        
                        const infoPanel = document.getElementById('building-info');
                        const title = document.getElementById('building-title');
                        const description = document.getElementById('building-description');
    
                        title.textContent = buildingData.title;
                        description.textContent = buildingData.description;
    
                        
                        infoPanel.classList.remove('hidden');
                        infoPanel.style.display = 'block'; 
                    } else {
                        const infoPanel = document.getElementById('building-info');
                        const title = document.getElementById('building-title');
                        const description = document.getElementById('building-description');
                    
                        title.textContent = "Building Not Found";
                        description.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel enim at arcu varius vulputate. Nulla facilisi.";
                    
                        infoPanel.classList.remove('hidden');
                        infoPanel.style.display = 'block';
                    }
                })
                .catch(error => console.error('Error fetching building data:',error));
        }
    }

    buildingImage(buildingName) {
        console.log(buildingName);
        const imageGrid = document.getElementById('image-grid');
        imageGrid.className = 'image-grid'; // Ensure the grid styling is applied
        imageGrid.innerHTML = ''; // Clear previous images
    
        const imageFolder = `./assets/images/${buildingName}`;
        const imageExtensions = ['0.webp', '1.webp', '2.webp', '3.webp'];
    
        imageExtensions.forEach((imageFile) => {
            const imgElement = document.createElement('img');
            imgElement.src = `${imageFolder}/${imageFile}`;
            imgElement.alt = `${buildingName} Image`;
            imgElement.onerror = () => {
                console.warn(`Image not found: ${imageFolder}/${imageFile}`);
            };
            imageGrid.appendChild(imgElement);
        });
    }
    closeInfoPanel() {
        const infoPanel = document.getElementById('building-info');
        infoPanel.classList.add('hidden');
        infoPanel.style.display = 'none';
    }
        
    animate() {
        requestAnimationFrame(() => this.animate());
    
        // Make all text meshes face the camera
        this.textMeshes.forEach((textMesh) => {
            textMesh.lookAt(this.sceneSetup.camera.position);
        });
        this.sceneSetup.controls.update();
        this.sceneSetup.render();   
        
    }
}

