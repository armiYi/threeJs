// 立方体测试类
import { CubeGeometry } from './cube.js';
// 三角形测试类
import { DeltaGeometry } from './delta.js';
import { Common } from './common.js';

// 导入three.js
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// 导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// 导入gltf加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 导入draco
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// 限制最大数量20
let cubes = [];
const cube = new CubeGeometry();
const delta = new DeltaGeometry();
var cubeID = 1;

// 创建GUI
const gui = new GUI();
// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x696969);

// const gltfLoader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/draco/');
// gltfLoader.setDRACOLoader(dracoLoader);
// gltfLoader.load(
//     "../public/model/solarpunk_village.glb",
//     (gltf) => {
//         console.log(gltf)
//         gltf.scene.position.set(0, -20, 0)
//         scene.add(gltf.scene);
//     }
// )
// // 创建环境贴图
// let rgbeLoader = new RGBELoader();
// rgbeLoader.load("/texture/1.hdr", (envMap) => {
//     envMap.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = envMap;
// });


// 创建相机
const camera = new THREE.PerspectiveCamera(
    75, // 视角
    window.innerWidth / window.innerHeight, // 宽高比
    0.1, // 近平面
    1000 // 远平面
);

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial());
sphere.castShadow = true;
sphere.position.set(0, 0, 3);
scene.add(sphere);

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plane = new THREE.Mesh(planeGeometry, new THREE.MeshStandardMaterial());
plane.position.set(0, -11, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// 灯光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.position.set(0, 11, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(2048, 2048);
scene.add(directionalLight);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启阴影贴图
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 创建模型
const parentCube = cube.init({ wireframe: true });
// parentCube.castShadow = true;
// const deltaFace = delta.init();

// 添加到场景
scene.add(parentCube);
// scene.add(deltaFace);
// deltaFace.position.set(3, 0, 0)
parentCube.position.set(0, 0, 0)

// 设置相机位置
camera.position.z = 30;
camera.position.y = 20;
camera.position.x = 30;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5000);
scene.add(axesHelper);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 开启阻尼效果
controls.enableDamping = true;
// 阻尼系数
controls.dampingFactor = 0.05;

// 创建射线
const raycaster = new THREE.Raycaster();
// 创建鼠标向量
const mouse = new THREE.Vector2();

function render() {
    controls.update();
    requestAnimationFrame(render);
    cubes.forEach(function (element) {
        // 遍历数组并对每个元素执行操作
        if (element.flag) {
            // 旋转
            element.rotation.x += 0.01;
            element.rotation.y += 0.01;
        }
    });
    renderer.render(scene, camera);
}

render();


let eventObj = {
    Fullscreen: function () {
        document.body.requestFullscreen();
    },
    ExitFullscreen: function () {
        document.exitFullscreen();
    },
    AutoRotate: function () {
        controls.autoRotate = controls.autoRotate ? false : 0.05;
    },
    AddCube: function () {
        const childCube = cube.init({
            wireframe: false,
            color: { color: Common.getRandomColor() },
            position: {
                x: Common.getRandomInteger(-10, 10),
                y: Common.getRandomInteger(-10, 10),
                z: Common.getRandomInteger(-10, 10)
            },
            gui: gui,
            cubeID: cubeID,
            parentCube: parentCube
        });
        parentCube.add(childCube);
        cubes.push(childCube);
        cubeID += 1;
        // 限制最大数量20
        if (cubes.length > 20) {
            parentCube.remove(cubes[0]);
            cubes.shift();
            gui.folders[0].destroy();
        }
    },
}

// 添加按钮
gui.add(eventObj, 'Fullscreen').name("全屏");
gui.add(eventObj, 'ExitFullscreen').name("退出全屏");
gui.add(eventObj, 'AutoRotate').name("场景旋转");
gui.add(eventObj, 'AddCube').name("添加cube");


// 双击控制屏幕进入全屏，退出全屏
// window.addEventListener("dblclick", () => {
//     const fullScreenElement = document.fullscreenElement;
//     if (!fullScreenElement) {
//         // 让画布对象全屏
//         renderer.domElement.requestFullscreen();
//     } else {
//         // 退出全屏，使用document对象
//         document.exitFullscreen();
//     }
// });

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
});


window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);

    // 计算物体和射线的交点
    const intersects = raycaster.intersectObjects(cubes);
    if (intersects.length > 0) {
        if (intersects[0].object._isSelected) {
            intersects[0].object.material.color.set(intersects[0].object._originColor);
            intersects[0].object._isSelected = false;
            return;
        }
        intersects[0].object._isSelected = true;
        intersects[0].object._originColor = intersects[0].object.material.color.getHex();
        intersects[0].object.material.color.set(0xffffff);
    }
});