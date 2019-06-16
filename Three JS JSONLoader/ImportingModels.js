var renderer = null,
    scene = null,
    camera = null,
    mesh = null;   // The three.js object that represents the model
var rotateX = 0;    // rotation of model about the x-axis
var rotateY = 0;    // rotation of model about the y-axis
var rotationChanged = false;
var loader;


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
    camera.position.x = 60;
    camera.position.z = 60
    camera.position.y = 20;
    camera.rotation.y = 0.7
    scene.add(camera);


    /* controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); }); */

    // LOAD THE MESH
    loader = new THREE.JSONLoader();
    loader.load('./models/MarmelabLogo.json', function (geometry, materials) {

       /*  for (let i = 0; i < materials.length; i++) { */
            //create Normal material
            var material = materials[0];
            mesh = new THREE.Mesh(geometry, material);
            //mesh.add(obj)

        //}
        // Center the geometry based on the bounding box
        mesh.translation = geometry.center();
        mesh.scale.set(10, 10, 10);

        scene.add(mesh);
        // Render the scene
        renderer.render(scene, camera);
    });

    // Add key handling
    document.onkeydown = handleKeyDown;

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


