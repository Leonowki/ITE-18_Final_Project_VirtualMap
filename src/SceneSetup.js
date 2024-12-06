import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

export class SceneSetup {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();
        this.controls = this.createControls();
        this.addHelpers();
        this.addLighting();
    }

    createCamera() {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.set(0, 20, 50);
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
    //removable after
    addHelpers() {
        const gridHelper = new THREE.GridHelper(500, 20);
        const axisHelper = new THREE.AxesHelper(100);
        this.scene.add(gridHelper, axisHelper);
    }

    addLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(ambientLight, directionalLight);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
