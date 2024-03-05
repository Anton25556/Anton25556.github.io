import * as THREE from 'three';

// starting images starting from the top
const STARTY = -20;

// create a new scene
const scene = new THREE.Scene();

// create and position the camera
scene.background = new THREE.TextureLoader().load('img/black.jpg')
const camera = new THREE.PerspectiveCamera
    (75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.y = STARTY;
camera.position.z = 40;

// create list of images in img folder
let imgList = [
    'me.jpg',
    'pic.png',
    'pong.png',
]

// add every listed image as a plane mesh texture to the scene
for (const image in imgList) {
    // every mesh has a geometry, texture and material
    const geometry = new THREE.PlaneGeometry(17, 19);
    const texture = new THREE.TextureLoader().load('img/' + imgList[image]);
    const material = new THREE.MeshBasicMaterial
        ({ color: 0xffffff, side: THREE.DoubleSide, map: texture });

    const plane = new THREE.Mesh(geometry, material);
    // add the new plane to the scene
    scene.add(plane);
}

// move thre camera with the scroll bar
function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.2
    console.log(top);
}

// add scrollbar event to move camera
document.body.onscroll = moveCamera;

// resize the threeJS canvas with the window and ajust for phone sizes
function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //ajust for phone or desktop size
    if (window.innerWidth <= 600) {
        // center camera
        camera.position.x = 0;
        // for every picture 
        for (const child in scene.children) {
            // unrotate them
            scene.children[child].rotation.y = 0;
            // change distance between them 
            scene.children[child].position.y = child * -40;
        }
    } else {
        // camer to side 
        camera.position.x = 35;
        for (const child in scene.children) {
            // rotate images
            scene.children[child].rotation.y = 15 * (Math.PI / 180);
            // change distance between images
            scene.children[child].position.y = child * -20;
        }
    }
}

// resize cancas on window resize
window.addEventListener('resize', resizeWindow, false);

// create the renderer and attch to the canvas
const renderer = new THREE.WebGLRenderer(
    { canvas: document.querySelector('#bg') }
);

// set initial canvas size
resizeWindow();

//s set renderer size and add it to the page 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// animation loop (calls itself recursively)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// start the animation
animate();