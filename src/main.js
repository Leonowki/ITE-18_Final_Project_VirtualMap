import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(100,100);
scene.add(gridHelper);
const axisHelper = new THREE.AxesHelper(100);
scene.add(axisHelper);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enablePan = true; 
controls.panSpeed = 1.5; 
controls.enableDamping = true; 
controls.dampingFactor = 0.1; 

camera.position.set( 0, 20,50 );
controls.update();
function animate() {
    controls.update();
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate); 
}

animate();
