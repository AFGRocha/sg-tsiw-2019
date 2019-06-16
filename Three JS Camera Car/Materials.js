
var renderer, scene, camera, camera2;
var chase = false;
var cubes = [];
var controls;
var cube;
let car = new THREE.Object3D();
let orientation;
let dir;
let box;
var mesh;
window.onload = function init() {
    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 500, 200);
    camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1000, 200);
    // position and point the camera to the center of the scene
    camera.position.set(0, 160, 200);
    camera.lookAt(scene.position);

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e4e0ba");

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);





    var ambientLight = new THREE.AmbientLight(0x111111); // soft white light
    scene.add(ambientLight);
    /*  var light = new THREE.DirectionalLight(0xffffff, 0.5); // soft white light
     light.position.set(5, 3, 5)
     scene.add(light); */

    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 300, 200);
    scene.add(light);

    var gridHelper = new THREE.GridHelper(300, 10, 0xff0000);
    scene.add(gridHelper);


    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('./models/toycar.mtl', function (materials) {
        materials.preload(); // load a material’s resource
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('./models/toycar.obj', function (object) {// load a geometry resource
            mesh = object;
            mesh.scale.set(0.2, 0.2, 0.2)
            box = new THREE.Box3().setFromObject(mesh)
            var help = new THREE.BoxHelper(mesh, 0xffff00)
            car.add(mesh)
            car.add(help)
            car.add(box)
            scene.add(car)
            console.log(box)



        });
    });

    var geometry = new THREE.CubeGeometry(10, 10, 10)
    var material = new THREE.MeshBasicMaterial({ color: 0x000000 })
    orientation = new THREE.Mesh(geometry, material);
    orientation.position.z = 40


    car.add(orientation)

    /*   if(chase == true)
      renderer.render(scene, camera2);
      else
      renderer.render(scene, camera); */

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    /* car.updateMatrixWorld(true);
    box.copy(car.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
 */
    console.log(car)
    animate()

}


function animate() {

    if (chase == true) {
        // camera TO object relative offset
        var relativeOffset = new THREE.Vector3(0, 150, -250);
        // updates (multiplies) the offset with the object ‘s global transformation matrix
        var cameraOffset = relativeOffset.applyMatrix4(car.matrixWorld);
        // updates the camera position with the new offset
        camera2.position.copy(cameraOffset);
        camera2.lookAt(car.position);
        renderer.render(scene, camera2);
    }

    else
        renderer.render(scene, camera);

    update()
    requestAnimationFrame(animate);
}

let key = ""

function handleKeyDown(event) {
    var char = String.fromCharCode(event.keyCode);
    switch (char) {
        case "1":
            chase = false
            break;
        case "2":
            chase = true
            console.log("teste")
            break;
        case "W":
            key = "up"
            break;
        case "S":
            key = "down"
            break;
        case "A":
            key = "left"
            break;
        case "D":
            key = "right"
            break;
        default:
            break;
    }
}

function update() {



    dir = orientation.position.clone();
    // posição plano (em relação ao pivot)
    dir = dir.clone().applyMatrix4(car.matrixWorld); // posição plano em coordenadas mundo

    dir.sub(car.position.clone()); // direção = posPlano - posPivot

    dir.multiplyScalar(0.02)


    if (key == "left") {
        car.rotation.y += 0.02
    }


    if (key == "right") {
        car.rotation.y -= 0.02
    }


    if (key == "up") {
        console.log("entrou")
        car.position.addVectors(car.position.clone(), dir);
    }

    if (key == "down") {
        car.position.subVectors(car.position.clone(), dir)
    }



}

function handleKeyUp(event) {
    var char = String.fromCharCode(event.keyCode);
    switch (char) {
        case "A":
            key = ""
            break;
        case "D":
            key = ""
            break;
        case "W":
            key = ""
            break;
        case "S":
            key = ""
            break;

        default:
            break;
    }
}