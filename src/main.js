import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene And Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

// Camera Position
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;


// Floor Geometry
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1,1,1)
const boxMaterial = new THREE.MeshStandardMaterial({color : 0xffffff})
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh)

// AmbientLight (모든곳에서 동일한 밝기 제공 - 그림자 X)
// const ambientLight = new THREE.AmbientLight(0xffffff, 5)
// scene.add(ambientLight)

// DirectionalLight
// const directionalLight = new THREE.DirectionalLight(0xffffff,5)
// directionalLight.castShadow = true;
// directionalLight.position.set(3,4,5)
// directionalLight.lookAt(0,0,0)
// scene.add(directionalLight)
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
// scene.add(directionalLightHelper)

// HemisphereLight
// const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
// hemisphereLight.position.set(0,1,0)
// hemisphereLight.lookAt(0,0,0)
// scene.add(hemisphereLight)
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,1)
// scene.add(hemisphereLightHelper)

// const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4);
// pointLight.castShadow = true;
// pointLight.position.set(1,1,1);
// scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

// const rectAreaLight = new THREE.RectAreaLight(0xffffff,5,2,2)
// rectAreaLight.position.set(0,1,2)
// scene.add(rectAreaLight)
const targetObj = new THREE.Object3D();
scene.add(targetObj)

const spotLight = new THREE.SpotLight(0xffffff,10,100, Math.PI/4,1,1);
spotLight.castShadow = true;
spotLight.position.set(0,3,0);
spotLight.target = targetObj;
spotLight.target.position.set(1,0,2)
scene.add(spotLight)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

// // Orbit Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

// Resize Handler
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

// Render Loop
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  textureMesh.rotation.y += 0.01;
};

render();
