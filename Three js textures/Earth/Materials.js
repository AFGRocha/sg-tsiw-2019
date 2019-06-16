
var renderer, scene, camera;
var cubes = [];
var controls;
var cube;
var geometry
var material
var control = "default";
var materialArray = [new THREE.MeshBasicMaterial({ color: 0x009e60 }), new THREE.MeshBasicMaterial({ color: 0x0051ba }), new THREE.MeshBasicMaterial({ color: 0xffd500 }), new THREE.MeshBasicMaterial({ color: 0xff5800, }), new THREE.MeshBasicMaterial({ color: 0xc41e3a }), new THREE.MeshBasicMaterial({ color: 0xffffff })]

window.onload = function init() {
    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 200);
    // position and point the camera to the center of the scene
    camera.position.set(-5, 5, 100);
    camera.lookAt(scene.position);

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    

    var geometry = new THREE.SphereGeometry(20, 32, 32);
    var texture = new THREE.TextureLoader().load ('./images/no_clouds_4k.jpg');
    var bump = new THREE.TextureLoader().load ('./images/elev_bump_4k.jpg');
    
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump , bumpScale: 0.4});
    var sphere = new THREE.Mesh(geometry, material);

    var clouds = new THREE.TextureLoader().load ('./images/fair_clouds_4k.png');
    var geometry = new THREE.SphereGeometry(20.1, 32, 32);
    var material = new THREE.MeshPhongMaterial({ map: clouds, transparent: true});
    var cloudSphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    scene.add(cloudSphere)

    var ambientLight = new THREE.AmbientLight(0x333333); // soft white light
    scene.add(ambientLight);
    var light = new THREE.DirectionalLight(0xffffff, 0.5); // soft white light
    light.position.set(5,3,5)
    scene.add(light);



    renderer.render(scene, camera);

    animate()

}


function animate() {

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
