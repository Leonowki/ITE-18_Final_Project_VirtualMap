import * as THREE from 'three';
import { MapControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/MapControls.js';

export class SceneSetup {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();
        this.controls = this.createControls();
        // this.addHelpers();
        this.addLighting();
        this.floorMap();
        this.addSky();

    } 

    createCamera() {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.set(-240, 50, -60);
        return camera;
    }

    cameraRange(){
        const minX = -230,maxX = 230;
        const minY = 3,maxY = 50;
        const minZ = -120,maxZ = 120;

        this.camera.position.x = Math.max(minX,Math.min(maxX,this.camera.position.x));
        this.camera.position.y = Math.max(minY,Math.min(maxY,this.camera.position.y));
        this.camera.position.z = Math.max(minZ,Math.min(maxZ,this.camera.position.z));

    }

    createRenderer() {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', ()=>{
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    
        return renderer;
    }

    createControls() {
        const controls = new MapControls(this.camera, this.renderer.domElement);
        controls.enablePan = true;
        controls.panSpeed = 1.0;
        controls.enableDamping = true;
        // controls.enableZoom = false;
        controls.dampingFactor = 0.1;
        controls.screenSpacePanning = true; 

        return controls;
    }
    //floor
    floorMap(){
        const floorTexture = new THREE.TextureLoader().load('/assets/floor-map/csu-enhanced.webp');
        const floorGeometry = new THREE.BoxGeometry(400,0.9,217);
        const floorMaterial = new THREE.MeshStandardMaterial({
            map:floorTexture,
            roughness:0.8,
            metalness:0.1,

        });

        const floor = new THREE.Mesh(floorGeometry,floorMaterial);
        floor.position.y = -1;
        this.scene.add(floor);

    }

    // // removable after
    // addHelpers() {
    //     const gridHelper = new THREE.GridHelper(400, 50);
    //     const axisHelper = new THREE.AxesHelper(100);
    //     this.scene.add(gridHelper, axisHelper);
    // }
    //sky
    addSky(){
        this.bgColor = 0xE2FEDD;
        this.scene.background = new THREE.Color(this.bgColor);

    }

    addLighting() {
        // ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        //directional lights
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(300, 300, 10);
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff,2);
        directionalLight2.position.set(-300,300,10);
        this.scene.add(directionalLight2);

        const directionalLight3 = new THREE.DirectionalLight(0xffffff,2);
        directionalLight3.position.set(0,300,300);
        this.scene.add(directionalLight3);
        
        const directionalLight4 = new THREE.DirectionalLight(0xffffff,2);
        directionalLight4.position.set(0,300,-600);
        this.scene.add(directionalLight4);
        // ==============================Helper================================================================================
        // Add light helpers
        // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5); // Size of helper
        // this.scene.add(directionalLightHelper);

        // const directionalLightHelper2 = new THREE.DirectionalLightHelper(directionalLight2, 5); // Size of helper
        // this.scene.add(directionalLightHelper2);

        // const directionalLightHelper3 = new THREE.DirectionalLightHelper(directionalLight3, 5); // Size of helper
        // this.scene.add(directionalLightHelper3);

        // const directionalLightHelper4 = new THREE.DirectionalLightHelper(directionalLight4, 5); // Size of helper
        // this.scene.add(directionalLightHelper4);
    
        // Create a basic helper for the ambient light (optional)
        // const ambientLightHelper = new THREE.Object3D();
        // const ambientHelperGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        // const ambientHelperMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        // const ambientHelperMesh = new THREE.Mesh(ambientHelperGeometry, ambientHelperMaterial);
        // ambientLightHelper.add(ambientHelperMesh);
        // ambientLightHelper.position.set(0, 10, 0); // Position helper in the scene
        // this.scene.add(ambientLightHelper);
    
        
    }
    
    render() {
        this.cameraRange();
        this.renderer.render(this.scene, this.camera);
        
    }
}
