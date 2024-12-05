import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio); // For high-DPI screens
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(500,20);
scene.add(gridHelper);
const axisHelper = new THREE.AxesHelper(100);
scene.add(axisHelper);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // White light, intensity 0.8
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const loader = new GLTFLoader();

loader.load('/assets/3d_models/new_admin_building.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(-90, 0, 0); 
    model.scale.set(1, 1, 1);   
    scene.add(model);
    console.log('Model loaded:', model);
});

const controls = new OrbitControls(camera, renderer.domElement);

controls.enablePan = true; 
controls.panSpeed = 1.5; 
controls.enableDamping = true; 
controls.dampingFactor = 0.1; 

camera.position.set( 0, 20,50 );
controls.update();
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // For smooth camera animations
    renderer.render(scene, camera);
}
animate();
