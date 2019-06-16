var renderer = null,
    scene = null,
    camera = null,
    mesh = null;   // The three.js object that represents the model
var rotateX = 0;    // rotation of model about the x-axis
var rotateY = 0;    // rotation of model about the y-axis
var rotationChanged = false;
var loader;
var loader2;
var mtlLoader;
var directionalLight;


window.onload = function init() {
    // Create the Three.js renderer
    renderer = new THREE.WebGLRenderer();
    // Set the viewport 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#AAAAAA");
    document.body.appendChild(renderer.domElement);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    var axis = new THREE.AxesHelper(1000);
    scene.add(axis)


    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    //camera.position.x = 60;
    camera.position.z = 200
    camera.position.y = 100;
    //camera.rotation.y = 0.7
    scene.add(camera);


    /* controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); }); */

    //light
    directionalLight = new THREE.DirectionalLight(0xffeedd, 0.9);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // LOAD THE MESH


    loader = new THREE.OBJLoader();
    var texture = new THREE.TextureLoader().load("./models/wood-floor.jpg")
    var materials = new THREE.MeshBasicMaterial({ map: texture });

    loader.load('./models/chair.obj', function (object) {

        // Go through all children of the loaded object and search for a Mesh
        object.traverse(function (child) {
            // This allow us to check if the children is an instance of the Mesh constructor
            if (child instanceof THREE.Mesh) {
                child.material.map = texture
                console.log(child)
            }
        })

        scene.add(object)
        object.position.set(30, 40, 0)
    });



    loader2 = new THREE.OBJLoader();
    loader2.load('./models/Ombro machine.obj', function (object) {

        scene.add(object)
        object.scale.set(0.1, 0.1, 0.1)
        //object.position.set(30,40,0)

    });

    renderer.render(scene, camera);

    // Add key handling
    //document.onkeydown = handleKeyDown;

    animate()

}


function handleKeyDown(event) {
    var char = String.fromCharCode(event.keyCode);
    switch (char) {
        case "&":
            mesh.rotation.x -= 0.05;
            break;
        case "(":
            mesh.rotation.x += 0.05;
            break;
        case "%":
            mesh.rotation.y -= 0.05
            break;
        case "'":
            mesh.rotation.y += 0.05
            break;
        default:
            mesh.rotation.y = 0
            mesh.rotation.x = 0;
            console.log(char)
            break;
    }
}


function animate() {
    // animate using requestAnimationFrame
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


