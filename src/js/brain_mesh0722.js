import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js";
import { FlakesTexture } from "https://rawcdn.githack.com/mrdoob/three.js/25d16a2c3c54befcb3916dbe756e051984c532a8/examples/jsm/textures/FlakesTexture.js";

var particleLight_a, particleLight_b, particleLight_c;
var renderer;
var brain;

function main() {
	const canvas = document.querySelector(".icon");

	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		alpha: true,
		antialias: true,
	});
	renderer.gammaOutput = true;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.25;

	setSize();

	const fov = 30;
	const aspect = 2;
	const near = 0.1;
	const far = 50;

	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(-12, 0, 12);
	camera.aspect = 1;
	camera.updateProjectionMatrix();

	const controls = new OrbitControls(camera, canvas);
	controls.enableZoom = false;
	controls.update();

	const scene = new THREE.Scene();

	// var axesHelper = new THREE.AxesHelper(5);
	// scene.add(axesHelper);

	// var light = new THREE.AmbientLight(0x404040); // soft white light
	// scene.add(light);

	particleLight_a = new THREE.Mesh(
		new THREE.SphereBufferGeometry(0.05, 8, 8),
		new THREE.MeshBasicMaterial({ color: 0xff0000 })
	);
	scene.add(particleLight_a);
	particleLight_a.add(new THREE.PointLight(0xff0000, 1));

	particleLight_b = new THREE.Mesh(
		new THREE.SphereBufferGeometry(0.05, 8, 8),
		new THREE.MeshBasicMaterial({ color: 0x0000ff })
	);
	scene.add(particleLight_b);
	particleLight_b.add(new THREE.PointLight(0x0000ff, 1));

	// Add fog
	scene.fog = new THREE.Fog(0xffffff, 10, 100);

	var group = new THREE.Group();

	const gltfLoader = new GLTFLoader();
	gltfLoader.load("model/scene.gltf", (gltf) => {
		console.log(gltf);
		brain = gltf.scene;

		brain.traverse(function (mesh) {
			if (mesh.isMesh) {
				console.log(mesh);

				// Global mesh styles
				mesh.material.roughness = 0;
				mesh.material.metalness = 0.5;
				mesh.material.color.setStyle("#8c2a2a");

				// mesh.material.type="MeshBasicMaterial";

				//	mesh.material.flatshading = true;
				// mesh.material.normalScale = new THREE.Vector2(0.15, 0.15);
				// mesh.material.wireframe = true;
				// mesh.material.wireframeLinewidth = 0.5;
			}
		});

		brain.position.set(0, -22, 0);
		group.add(brain);
		scene.add(group);

		// var geometry = new THREE.SphereBufferGeometry(2.5, 64, 32);

		// var normalMap3 = new THREE.CanvasTexture(new FlakesTexture());
		// normalMap3.wrapS = THREE.RepeatWrapping;
		// normalMap3.wrapT = THREE.RepeatWrapping;
		// normalMap3.repeat.x = 10;
		// normalMap3.repeat.y = 6;
		// normalMap3.anisotropy = 16;

		// var material = new THREE.MeshPhysicalMaterial({
		// 	clearcoat: 1.0,
		// 	clearcoatRoughness: 0.1,
		// 	metalness: 0.9,
		// 	roughness: 0.5,
		// 	color: 0x0000ff,
		// 	normalMap: normalMap3,
		// 	normalScale: new THREE.Vector2(0.15, 0.15),
		// });
		// var ball = new THREE.Mesh(geometry, material);

		// scene.add(ball);
	});

	function animate() {
		// const canvas = renderer.domElement;
		// camera.aspect = 1;
		// camera.updateProjectionMatrix();

		renderer.render(scene, camera);

		lightShow();

		requestAnimationFrame(animate);

		// controls.update();
	}

	function lightShow() {
		var timer = Date.now() * 0.00025;

		particleLight_a.position.x = Math.sin(timer * 7) * 30;
		particleLight_a.position.y = Math.cos(timer * 5) * 40;
		particleLight_a.position.z = Math.cos(timer * 3) * 30;

		particleLight_b.position.x = Math.sin(timer * -7) * 30;
		particleLight_b.position.y = Math.cos(timer * -5) * 40;
		particleLight_b.position.z = Math.cos(timer * -3) * 30;

		// particleLight_c.position.x = Math.sin(timer * 7) * 3;
		// particleLight_c.position.y = Math.cos(timer * 5) * 4;
		// particleLight_c.position.z = Math.cos(timer * -3) * -3;

		// group.rotation.y = (Math.PI / 2) * timer;

		renderer.render(scene, camera);
	}

	function setSize() {
		const canvas_size = document
			.querySelector(".icon")
			.getBoundingClientRect();

		renderer.setSize(canvas_size.width, canvas_size.height);
	}

	requestAnimationFrame(animate);
}

main();
