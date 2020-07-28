import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { ShadowMapViewer } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/utils/ShadowMapViewer.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js";

var camera, scene, renderer, clock;
var light_1, light_2, light_3, light_4, light_5, light_6, light_7;
var start_time;
var cube, brain;

init();

function init() {
	initScene();
	initMisc();
}

function initScene() {
	camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
	camera.position.set(0, 0, 15);
	scene = new THREE.Scene();

	var sphere_radius = 0.05;
	var sphere = new THREE.SphereBufferGeometry(sphere_radius, 100, 20);

	var light_distance = 1;
	var light_intensity = 30;

	var brain_color = 0xffffff;
	var wall_color = 0x009dff;
	var ambient_light_color = 0xffffff;

	var light_1_color = 0xffff00;
	var light_2_color = 0xff0000;
	var light_3_color = 0xffaa00;
	var light_4_color = 0x009dff;
	var light_5_color = 0x000fff;
	var light_6_color = 0x0f00f0;
	var light_7_color = 0x2f5091;

	// Lights
	var light = new THREE.AmbientLight(ambient_light_color, 1);
	scene.add(light);

	light_1 = new THREE.PointLight(
		light_1_color,
		light_distance,
		light_intensity
	);
	light_1.add(
		new THREE.Mesh(
			sphere,
			new THREE.MeshBasicMaterial({ color: light_1_color })
		)
	);
	scene.add(light_1);

	light_2 = new THREE.PointLight(
		light_2_color,
		light_distance,
		light_intensity
	);
	light_2.add(
		new THREE.Mesh(
			sphere,
			new THREE.MeshBasicMaterial({ color: light_2_color })
		)
	);
	scene.add(light_2);

	light_3 = new THREE.PointLight(
		light_3_color,
		light_distance,
		light_intensity
	);
	light_3.add(
		new THREE.Mesh(
			sphere,
			new THREE.MeshBasicMaterial({ color: light_3_color })
		)
	);
	scene.add(light_3);

	light_4 = new THREE.PointLight(
		light_4_color,
		light_distance,
		light_intensity
	);
	light_4.add(
		new THREE.Mesh(
			sphere,
			new THREE.MeshBasicMaterial({ color: light_4_color })
		)
	);
	scene.add(light_4);

	light_5 = new THREE.PointLight(light_5_color, 5, 10);
	light_5.position.x = 0;
	light_5.position.y = -5;
	light_5.position.z = 0;
	scene.add(light_5);

	light_6 = new THREE.PointLight(light_6_color, 5, 10);
	light_6.position.x = 0;
	light_6.position.y = 5;
	light_6.position.z = 0;
	scene.add(light_6);

	light_7 = new THREE.PointLight(light_7_color, 5, 10);
	light_7.position.x = -5;
	light_7.position.y = 0;
	light_7.position.z = -10;
	scene.add(light_7);

	// Wall
	// var geometry = new THREE.BoxGeometry(12.75, 12.75, 0.1);
	// var material = new THREE.MeshStandardMaterial({
	// 	color: wall_color,
	// 	side: THREE.DoubleSide,
	// 	roughness: 1,
	// 	metalness: 1,
	// });

	// var wall = new THREE.Mesh(geometry, material);
	// wall.position.x = 0;
	// wall.position.z = -10;
	// wall.rotation.y = 0;
	// scene.add(wall);

	// Brain
	const gltfLoader = new GLTFLoader();
	gltfLoader.load("model/scene.gltf", (gltf) => {
		console.log(gltf);
		brain = gltf.scene;

		brain.traverse(function (mesh) {
			if (mesh.isMesh) {
				mesh.material.roughness = 0.5;
				mesh.material.metalness = 0.9;
				mesh.material.color.setHex(brain_color);
			}
		});

		brain.position.set(0, -22, 0);
		scene.add(brain);
	});

	THREE.DefaultLoadingManager.onStart = function (
		url,
		itemsLoaded,
		itemsTotal
	) {
		console.log(
			url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files."
		);
	};

	THREE.DefaultLoadingManager.onLoad = function () {
		console.log("Loading Complete!");

		start_time = Date.now();

		moveObject();

		animate();
	};

	THREE.DefaultLoadingManager.onProgress = function (
		url,
		itemsLoaded,
		itemsTotal
	) {
		console.log(
			url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files."
		);
	};

	THREE.DefaultLoadingManager.onError = function (url) {
		console.log("There was an error loading " + url);
	};
}

function initMisc() {
	renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector(".hero"),
		antialias: true,
		alpha: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio);

	// Mouse control
	var controls = new OrbitControls(
		camera,
		document.querySelector(".hero-wrapper")
	);
	controls.autoRotate = false;
	controls.enableZoom = false;
	controls.enablePan = false;

	controls.update();
}

function moveObject() {
	console.log("moveObject();");

	light_7.position.x = 0;
	light_7.position.y = 0;
	light_7.position.z = -10;
}

function animate() {
	requestAnimationFrame(animate);

	var time = (Date.now() - start_time) * 0.00025;
	brain.rotation.y = time;

	var time = time * 10;
	var half = 0.1;

	light_1.position.x = Math.sin(time * 0.7) * 30 * half;
	light_1.position.y = Math.cos(time * 0.5) * 40 * half;
	light_1.position.z = Math.cos(time * 0.3) * 30 * half;

	light_2.position.x = Math.cos(time * 0.3) * 30 * half;
	light_2.position.y = Math.sin(time * 0.5) * 40 * half;
	light_2.position.z = Math.sin(time * 0.7) * 30 * half;

	light_3.position.x = Math.sin(time * 0.7) * 30 * half;
	light_3.position.y = Math.cos(time * 0.3) * 40 * half;
	light_3.position.z = Math.sin(time * 0.5) * 30 * half;

	light_4.position.x = Math.sin(time * 0.3) * 30 * half;
	light_4.position.y = Math.cos(time * 0.7) * 40 * half;
	light_4.position.z = Math.sin(time * 0.5) * 30 * half;

	renderer.render(scene, camera);
}
