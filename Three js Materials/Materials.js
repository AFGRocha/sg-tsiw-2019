
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

    //cubes
    function addCube() {
        //TODO
    }

    for (var i = 0; i < 100; i++)
        addCube(i);


    var light = new THREE.PointLight(0xff0000, 1.5, 100);
    light.position.set(0, 25, 80);
    scene.add(light)


    geometry = new THREE.BoxGeometry(6, 6, 6);
    material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    cube = new THREE.Mesh(geometry, material);

    scene.add(cube)

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(ambientLight);

    document.onkeydown = handleKeyDown;

    renderer.render(scene, camera);

    animate()

}

//----------------------------------------------------------------------------
// Keyboard Event Functions
//----------------------------------------------------------------------------
/* document.onkeydown = function handleKeyDown(event) {
    //Get unshifted key character
    var key = String.fromCharCode(event.keyCode);

    //console.log(key)

    switch (key) {

        default:
            for (var i = 0; i < cubes.length; i++) {
                var color = new THREE.Color(0xffffff);
                color.setRGB(Math.random(), Math.random(), Math.random());
                cubes[i].material = new THREE.MeshBasicMaterial({ color: color });
                cubes[i].visible = true;
            }
            break;
    }
    renderer.render(scene, camera);
} */

function animate() {
 /*    if (control == "default") {
        cube.material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    }

    if (control == "normal") {
        cube.material = new THREE.MeshNormalMaterial();

    }

    if (control == "depth") {
        cube.material = new THREE.MeshDepthMaterial();
    }

    if (control == "lambert") {
        cube.material = new THREE.MeshLambertMaterial({ color: 0x7833aa });
    }

    if (control == "phong") {
        cube.material = new THREE.MeshPhongMaterial({ color: 0x7833aa, shininess: 10, specular: 0x00FF00 })
    }

    if (control == "array") {
        cube.material = materialArray
    }

    if (control == "press F") {
        cube.material = new THREE.MeshBasicMaterial({ vertexColor: THREE.FaceColors });
    } */
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


function handleKeyDown(event) {
    var char = String.fromCharCode(event.keyCode);
    switch (char) {
        case "N":
            control = "normal"
            cube.material = new THREE.MeshNormalMaterial();
            console.log(cube.geometry)
            break;
        case "D":
            control = "depth"
            cube.material = new THREE.MeshDepthMaterial();
            break;
        case "L":
            control = "lambert"
            cube.material = new THREE.MeshLambertMaterial({ color: 0x7833aa });
            break;
        case "P":
            control = "phong"
            cube.material = new THREE.MeshPhongMaterial({ color: 0x7833aa, shininess: 10, specular: 0x00FF00 })
            break;
        case "A":
            control = "array"
            cube.material = materialArray
            break;
        case "F":
            control = "press F"
            cube.material = new THREE.MeshBasicMaterial({ vertexColor: THREE.FaceColors });
            cube.geometry.colorsNeedUpdate = true 
            break;
        default:
            control = "default"
            cube.material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
            console.log(char)
            break;
    }
}