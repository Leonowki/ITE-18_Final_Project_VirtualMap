import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';
import { MathUtils, Vector3 } from 'three';
import { Sky } from 'three/addons/objects/Sky.js';


export class SceneSetup {
    constructor() {
        //add things here to webGL
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();
        this.controls = this.createControls();
        this.addHelpers();
        this.addLighting();
        this.floorMap();
        this.addSky()

    }

    createCamera() {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.set(0, 500, 50);
        return camera;
    }

    createRenderer() {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    
        return renderer;
    }

    createControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enablePan = true;
        controls.panSpeed = 1.5;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        return controls;
    }

    //floor
    floorMap(){
        const floorGeometry = new THREE.BoxGeometry(1000,1,1000);
        const floorMaterial = new THREE.MeshBasicMaterial({
            color:0x157104,
        });


        const floor = new THREE.Mesh(floorGeometry,floorMaterial);
        floor.position.y = -1;
        this.scene.add(floor);

    }

    //removable after
    addHelpers() {
        const gridHelper = new THREE.GridHelper(1000, 100);
        const axisHelper = new THREE.AxesHelper(100);
        this.scene.add(gridHelper, axisHelper);
    }
    //sky
    addSky(){
        const sky = new Sky();
        sky.scale.setScalar(450000);
        
    
        // Position the sun at noon (directly overhead)
        const phi = MathUtils.degToRad(80); // 0 degrees from zenith for direct overhead
        const theta = MathUtils.degToRad(0);    // 0 degrees from north, arbitrary as sun is overhead
        const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);
    
        // Apply the sun position to the sky's shader material
        sky.material.uniforms.sunPosition.value.copy(sunPosition);

        // Adjust atmospheric settings
        sky.material.uniforms.turbidity.value = 0; // Lower for clear sky
        sky.material.uniforms.rayleigh.value = 0.7;  // Higher for more blue scattering
        sky.material.uniforms.mieCoefficient.value = 0.005; // Lower for less hazy sun
        sky.material.uniforms.mieDirectionalG.value = -1;  // Adjust sharpness of the sun's glare

        // Adjust renderer exposure for brightness
        this.renderer.toneMappingExposure = 0; // Increase for brighter appearance (default is 1)
    
        // Add the sky to the scene
        this.scene.add(sky);
    }

    addLighting() {
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
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
    
        console.log('Lighting and helpers added');
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
