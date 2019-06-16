var renderer = null,
    scene = null,
    camera = null,
    mesh = null;   // The three.js object that represents the model
var rotateX = 0;    // rotation of model about the x-axis
var rotateY = 0;    // rotation of model about the y-axis
var rotationChanged = false;
var loader;
var mouse = new THREE.Vector2()
var raycaster = new THREE.Raycaster()
var plane
var selectedObject
var drag;

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

    plane = new THREE.Mesh(new THREE.PlaneGeometry(24,24, 10, 10),
        new THREE.MeshBasicMaterial({
           /*  opacity: 0.0,
            transparent: true,
            visible: false */
            color: 0x000000
        }));
    plane.rotation.x = -3.14 / 2
    plane.position.y = 2
    plane.position.z = -10.5
    plane.position.x = 10.5

    console.log(plane)
    scene.add(plane)

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.x = 10;
    camera.position.z = 20
    camera.position.y = 20;
    camera.rotation.x = -0.5
    scene.add(camera);

    raycaster.setFromCamera(mouse, camera)


    /*     controls = new THREE.OrbitControls(camera);
        controls.addEventListener('change', function () { renderer.render(scene, camera); }); */



    renderer.render(scene, camera);
    board()
    whiteCheckers()
    //drag = new THREE.DragControls(whiteCheckersArray,camera,renderer.domElement )
    animate()

}


function animate() {
    // animate using requestAnimationFrame


    /* raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(scene.children)

    for (var i = 0; i < intersects.length; i++) {
        //console.log(intersects)

        if (intersects[i].object.name == "checker") {
            //intersects[ i ].object.material.color.set( 0xff0000 );
            // intersects[i].object.position.x = mouse.x
        }



    } */
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    //window.addEventListener('mousemove', onMouseMove, false);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


let sideCount = 0
let upCount = 0
let sideX = 0
let sideY = 0
let sideZ = 0
function board() {
    for (let i = 0; i < 64; i++) {
        var geometry = new THREE.BoxGeometry(3, 3, 3);

        if (upCount % 2 == 0) {
            if (sideCount % 2 == 0) {
                var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
                cube = new THREE.Mesh(geometry, material);
            }

            else {
                var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
                cube = new THREE.Mesh(geometry, material);
            }
        }
        else {
            if (sideCount % 2 == 0) {
                var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
                cube = new THREE.Mesh(geometry, material);
            }

            else {
                var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
                cube = new THREE.Mesh(geometry, material);
            }
        }

        cube.name = "cube"
        cube.position.x = sideX
        cube.position.z = sideZ
        sideX += 3
        if (sideCount == 7) {
            sideZ -= 3
            sideX = 0
            upCount++
            sideCount = -1
        }
        sideCount++
        scene.add(cube)

    }

}

let whiteSCount = 0
let whiteUCount = 0
let whitePosX = 0
let whitePosZ = 0
var whiteCheckersArray = []
function whiteCheckers() {
    // LOAD THE MESH
    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {
            loader = new THREE.JSONLoader();
            loader.load('./models/peca.json', function (geometry, materials) {

                /*  for (let i = 0; i < materials.length; i++) { */
                //create Normal material

                var material = new THREE.MeshNormalMaterial({ color: 0xFFFFFF });
                mesh = new THREE.Mesh(geometry, material);
                //mesh.add(obj)

                //}
                // Center the geometry based on the bounding box
                mesh.translation = geometry.center();
                mesh.scale.set(3, 3, 7);
                mesh.position.y = 2
                mesh.rotation.x = (Math.PI / 2)

                mesh.position.x = whitePosX
                mesh.position.z = whitePosZ
                mesh.name = "checker"

                whitePosX += 6
                whiteCheckersArray.push(mesh)
                scene.add(mesh);
                // Render the scene
                console.log("first")
            });
        }

        console.log("2nd")
        whitePosX = 3
        whitePosZ -= 3

    }


}


function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    if (selectedObject) {
        //drag an object around if we've already clicked on one
        var intersects = raycaster.intersectObject(plane);
        selectedObject.position.copy(intersects[0].point.sub(offset));
    }
    else { //reposition the plane ?
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0)
            plane.position.copy(intersects[0].object.position);
    }

    /* 
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1; */

}

var offset = new THREE.Vector3();

function onMouseDown(event) {
    var intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
        console.log(intersects[i].object.name)
        //console.log(whiteCheckersArray)
        if (intersects[i].object.name == "checker") {
            // gets intersect object (global variable)
            selectedObject = intersects[i].object;
            // gets intersection with the helper plane
            var intersectsPlane = raycaster.intersectObject(plane);

            // calculates the offset (global variable)
            offset.copy(intersectsPlane[0].point).sub(selectedObject.position);
            console.log(selectedObject)
        }
    }
}

function onMouseUp(event) {
    selectedObject = null;
}