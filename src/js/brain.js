/**
 * @author Bennett Feely / https://bennettfeely.com
 */
var camera, scene, renderer;
var light_1, light_2, light_3, light_4, light_5, light_6;
var start_time;
var cube, brain;

init();

function init() {
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

	var light_1_color = 0xfff42b;
	var light_2_color = 0xff4621;
	var light_3_color = 0xfc8b12;
	var light_4_color = 0x009dff;
	var light_5_color = 0x000fff;
	var light_6_color = 0x0f00f0;

	// Lights
	var light = new THREE.AmbientLight(ambient_light_color, 1);
	scene.add(light);

	// Yellow light
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

	// Red light
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

	// Orange light
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

	// Light blue light
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

	// Stationary ultraviolet top light
	light_5 = new THREE.PointLight(light_5_color, 5, 10);
	light_5.position.x = 0;
	light_5.position.y = -5;
	light_5.position.z = 0;
	scene.add(light_5);

	// Stationary blue bottom light
	light_6 = new THREE.PointLight(light_6_color, 5, 10);
	light_6.position.x = 0;
	light_6.position.y = 5;
	light_6.position.z = 0;
	scene.add(light_6);

	// Load Brain Mesh
	var gltfLoader = new THREE.GLTFLoader();
	gltfLoader.load("model/scene.gltf", (gltf) => {
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

	THREE.DefaultLoadingManager.onLoad = function () {
		// Roll in canvas.hero
		document.querySelector(".hero").classList.add("roll");

		animate();
	};

	THREE.DefaultLoadingManager.onError = function (url) {
		console.error("Error loading " + url);
	};

	// Setup controls
	var controls = new THREE.OrbitControls(
		camera,
		document.querySelector(".hero")
	);
	controls.autoRotate = false;
	controls.enableZoom = false;
	controls.enablePan = false;

	controls.update();

	// Setup the renderer
	renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector(".hero"),
		antialias: true,
		alpha: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio);
}

function animate() {
	requestAnimationFrame(animate);

	var time = Date.now() * 0.0025;

	// Spin the brain
	brain.rotation.y = time * 0.1;

	// Orbit lights
	light_1.position.set(
		Math.sin(time * 0.7) * 3,
		Math.cos(time * 0.5) * 4,
		Math.cos(time * 0.3) * 3
	);
	light_2.position.set(
		Math.cos(time * 0.3) * 3,
		Math.sin(time * 0.5) * 4,
		Math.sin(time * 0.7) * 3
	);
	light_3.position.set(
		Math.sin(time * 0.7) * 3,
		Math.cos(time * 0.3) * 4,
		Math.sin(time * 0.5) * 3
	);
	light_4.position.set(
		Math.sin(time * 0.3) * 3,
		Math.cos(time * 0.7) * 4,
		Math.sin(time * 0.5) * 3
	);

	renderer.render(scene, camera);
}
