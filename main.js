import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//fog

const fog = new THREE.Fog('#4b7bec', 2, 15 );
scene.fog = fog;

// texture

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/brown-wooden-door.jpg');
const wallColorTexture = textureLoader.load('/red-brick-wall-pattern-texture.jpg');
const grass = textureLoader.load('/texture-grass-field');
const bushTexture = textureLoader.load('/bush.jpg')
const roofTexture = textureLoader.load('/roof');
 
//light

const light = new THREE.AmbientLight( 0xffffff, 1 ); 
scene.add( light );

const moonlight = new THREE.DirectionalLight( 0xffffff, 1 );
moonlight.position.set(4, 5,-2);
scene.add(moonlight);

const doorlight = new THREE.PointLight('#ffa502', 4, 8);
doorlight.position.set(0,2.2,3.1);
scene.add(doorlight);

const ghost1 = new THREE.PointLight('#ff0000', 4, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#e056fd', 4, 3);
scene.add(ghost2);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setClearColor('#4b7bec');
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

//floor

const floor = new THREE.PlaneGeometry( 22, 22 );
const floorMaterial = new THREE.MeshStandardMaterial( {
	// color: 0x44bd32,
	map:grass} );
const plane = new THREE.Mesh( floor, floorMaterial );
plane.rotation.x = - (Math.PI * 0.5);
plane.position.y = 0;
scene.add( plane );

//house

const house = new THREE.BoxGeometry( 5, 2.5, 5 ); 
const houseMaterial = new THREE.MeshStandardMaterial( {
	// color: 0xBDC581,
	map:wallColorTexture
} ); 
	
const cube = new THREE.Mesh( house, houseMaterial ); 
cube.position.y = 1.25;
scene.add( cube );

//roof

const roof = new THREE.ConeGeometry( 5, 2, 4 ); 
const roofMaterial = new THREE.MeshStandardMaterial( {map:roofTexture} );
const cone = new THREE.Mesh(roof, roofMaterial ); 
cone.position.y = 3.5;
cone.rotation.y = Math.PI / 4;
scene.add( cone );

//door

const door = new THREE.PlaneGeometry( 1, 2 );
const doorMaterial = new THREE.MeshStandardMaterial( {
	// color: 0x6D214F,
	map:doorColorTexture
} );
const doorPlane = new THREE.Mesh( door, doorMaterial );
// doorPlane.rotation.z = - (Math.PI * 0.25);
doorPlane.position.y = 1.0;
doorPlane.position.z = 2.51;
scene.add( doorPlane );

//bushes

const bush = new THREE.SphereGeometry(5, 32, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
	color:0xC4E538,
	map:bushTexture
});
const sphere = new THREE.Mesh(bush, bushMaterial);
sphere.position.y = 0.1;
sphere.position.z = 3;
sphere.position.x = 1;
sphere.scale.set(0.05,0.05,0.05);
scene.add( sphere );

const bush1 = new THREE.SphereGeometry(5, 32, 16);
const bushMaterial1 = new THREE.MeshStandardMaterial({
	color: 0xC4E538,
	map:bushTexture
});
const sphere1 = new THREE.Mesh(bush1, bushMaterial1);
sphere1.position.y = 0.1;
sphere1.position.z = 4;
sphere1.position.x = -1.1;
sphere1.scale.set(0.05, 0.05, 0.05);
scene.add(sphere1);


const bush2 = new THREE.SphereGeometry(5, 32, 16);
const bushMaterial2 = new THREE.MeshStandardMaterial({
	color: 0xC4E538,
	map:bushTexture
});
const sphere2 = new THREE.Mesh(bush2, bushMaterial2);
sphere2.position.y = 0.1;
sphere2.position.z = 3;
sphere2.position.x = -1.8;
sphere2.scale.set(0.13, 0.13, 0.13);
scene.add(sphere2);


const bush3 = new THREE.SphereGeometry(5, 32, 16);
const bushMaterial3 = new THREE.MeshStandardMaterial({
	// color: 0xC4E538,
	map:bushTexture});
const sphere3 = new THREE.Mesh(bush3, bushMaterial3);
sphere3.position.y = 0.1;
sphere3.position.z = 3;
sphere3.position.x = 1.6;
sphere3.scale.set(0.1, 0.1, 0.1);
scene.add(sphere3);

//graves

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.4,0.8,0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color: 0x747d8c});

for( let j=0; j<50; j++ ){
	const angle = Math.random() * Math.PI * 2;
	const radius = 3.5 + Math.random() * 6;
	const x = Math.sin(angle) * radius;
	const z = Math.cos(angle) * radius;
	const grave = new THREE.Mesh(graveGeometry,graveMaterial)
	grave.position.set(x, 0.3, z);
	grave.rotation.y = (Math.random() - 0.5) * 0.4;
	grave.rotation.z = (Math.random() - 0.5) * 0.4;
	graves.add(grave);

}

camera.position.z = 12;
camera.position.y = 3;
camera.position.x = 4;

controls.update();

const clock = new THREE.Clock();

function animate() {
	const elapsedTime = clock.getElapsedTime();
	// console.log(elapsedTime);
	const ghostangle = elapsedTime * 0.35;
	ghost1.position.x = Math.cos(ghostangle) * 5;
	ghost1.position.z = Math.sin(ghostangle) * 5;
	ghost1.position.y = Math.sin(ghostangle) * 3;

	const ghostangle2 = -elapsedTime * 1;
	ghost2.position.x = Math.cos(ghostangle2) * (7 + Math.sin(elapsedTime * 0.32))
	ghost2.position.z = Math.sin(ghostangle2) * (7 + Math.sin(elapsedTime * 0.5));
	ghost2.position.y = Math.sin(ghostangle) * 4 + Math.sin(ghostangle) * 1.5;
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();