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

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

// Floor Geometry
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side: THREE.FrontSide,
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.y = 0.5;
frontSideMesh.position.z = 4;
frontSideMesh.castShadow = true;
frontSideMesh.receiveShadow = true;
scene.add(frontSideMesh);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.5, 4);
backSideMesh.position.y = 0.51; // z fighting
// backSideMesh.castShadow = true
backSideMesh.receiveShadow = true;
scene.add(backSideMesh);

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(4, 0.5, 4);
doubleSideMesh.position.y = 0.51;
doubleSideMesh.receiveShadow = true;
// doubleSideMesh.castShadow = true
scene.add(doubleSideMesh);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusKnotStandMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});
torusKnotStandMaterial.roughness = 0.5;
torusKnotStandMaterial.metalness = 1;
const torusKnotStandardMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotStandMaterial
);
torusKnotStandardMesh.castShadow = true;
torusKnotStandardMesh.receiveShadow = true;
torusKnotStandardMesh.position.set(-4, 1, 0);
scene.add(torusKnotStandardMesh);

const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotLambertMaterial.emissiveIntensity = 0.2;
const torusKnotLambertMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotLambertMaterial
);
torusKnotLambertMesh.castShadow = true;
torusKnotLambertMesh.receiveShadow = true;
torusKnotLambertMesh.position.set(-2, 1, 0);
scene.add(torusKnotLambertMesh);

const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0x000ff);
torusKnotPhongMaterial.shininess = 100;
const torusKnotPhongMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotPhongMaterial
);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const torusKnotBasicMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotBasicMaterial
);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ color: 0xffffff });
torusKnotDepthMaterial.opacity = 0.5;
const torusKnotDepthMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotDepthMaterial
);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);

const textureLoader = new THREE.TextureLoader();
// textureLoader.load("/threejs.webp", (texture) => {
//   const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
//   const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
//   const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
//   textureMesh.castShadow = true;
//   textureMesh.receiveShadow = true;
//   textureMesh.position.set(0, 0.5, 2);
//   scene.add(textureMesh);
// });

const texture = await textureLoader.loadAsync("/threejs.webp");
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
textureMesh.castShadow = true;
textureMesh.receiveShadow = true;
textureMesh.position.set(0, 0.5, 2);
scene.add(textureMesh);

// // Box Geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.castShadow = true;
// mesh.position.y = 0.5;
// scene.add(mesh);

// // Capsule Geometry
// const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
// const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
// const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
// capsuleMesh.position.set(3, 1.75, 0);
// capsuleMesh.castShadow = true;
// capsuleMesh.receiveShadow = true;
// scene.add(capsuleMesh);

// // Cylinder Geometry
// const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
// const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
// cylinderMesh.position.set(-3, 1, 0);
// cylinderMesh.castShadow = true;
// cylinderMesh.receiveShadow = true;
// scene.add(cylinderMesh);

// // Torus Geometry
// const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
// const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
// const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
// torusMesh.position.set(0, 0.5, 1);
// torusMesh.castShadow = true;
// torusMesh.receiveShadow = true;
// scene.add(torusMesh);

// // Star Shape
// const starShape = new THREE.Shape();
// starShape.moveTo(0, 1);
// starShape.lineTo(0.2, 0.2);
// starShape.lineTo(1, 0.2);
// starShape.lineTo(0.4, -0.1);
// starShape.lineTo(0.6, -1);
// starShape.lineTo(0, -0.5);
// starShape.lineTo(-0.6, -1);
// starShape.lineTo(-0.4, -0.1);
// starShape.lineTo(-1, 0.2);
// starShape.lineTo(-0.2, 0.2);

// // Shape Geometry
// const shapeGeometry = new THREE.ShapeGeometry(starShape);
// const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
// const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
// shapeMesh.position.set(0, 1, 2);
// scene.add(shapeMesh);

// // 3D Star Shape
// const extrudeSettings = {
//   steps: 1,
//   depth: 0.1,
//   bevelEnabled: true,
//   bevelThickness: 0.1,
//   bevelSize: 0.3,
//   bevelSegments: 100,
// };

// const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
// const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
// const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
// extrudeMesh.position.set(2, 1.3, 2);
// extrudeMesh.castShadow = true;
// extrudeMesh.receiveShadow = true;
// scene.add(extrudeMesh);

// // Sphere Geometry
// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x98daaf });
// const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphereMesh.position.set(0, 1, -3);
// sphereMesh.castShadow = true;
// scene.add(sphereMesh);

// // Dot Geometry
// const numPoints = 1000;
// const positions = new Float32Array(numPoints * 3);

// for (let i = 0; i < numPoints; i += 1) {
//   const x = (Math.random() - 0.5) * 1;
//   const y = (Math.random() - 0.5) * 1;
//   const z = (Math.random() - 0.5) * 1;

//   positions[i * 3] = x;
//   positions[i * 3 + 1] = y;
//   positions[i * 3 + 2] = z;
// }

// const bufferGeometry = new THREE.BufferGeometry();
// bufferGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions, 3)
// );

// const PointsMaterial = new THREE.PointsMaterial({
//   color: 0xffff00,
//   size: 0.05,
// });

// const point = new THREE.Points(sphereGeometry, PointsMaterial);
// point.position.set(0, 0, -5);
// scene.add(point);

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
