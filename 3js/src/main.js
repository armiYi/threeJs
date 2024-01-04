// 立方体测试类
import { CubeGeometry } from './cube.js';
// 三角形测试类
import { DeltaGeometry } from './delta.js';

// 导入three.js
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

// 限制最大数量20
let cubes = [];
const cube = new CubeGeometry();
const delta = new DeltaGeometry();

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75, // 视角
    window.innerWidth / window.innerHeight, // 宽高比
    0.1, // 近平面
    1000 // 远平面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建模型
const parentCube = cube.init({ wireframe: true });
const deltaFace = delta.init();

// 添加到场景
scene.add(parentCube);
scene.add(deltaFace);
parentCube.position.set(0, 0, 0)


// 设置相机位置
camera.position.z = 20;
camera.position.y = 10;
camera.position.x = 10;
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

function render() {
    // console.log(cubes.length)
    controls.update();
    requestAnimationFrame(render);
    // 旋转
    // childCube.rotation.x += 0.01;
    // childCube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// 随机数
function getRandomInteger(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    if (num == 0) {
        num = getRandomInteger(min, max);
    }
    return num;
}
// 随机颜色
function getRandomColor() {
    const color = new THREE.Color();
    color.setRGB(Math.random(), Math.random(), Math.random());
    return color;
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
            color: { color: getRandomColor() },
            position: {
                x: getRandomInteger(-10, 10),
                y: getRandomInteger(-10, 10),
                z: getRandomInteger(-10, 10)
            },
        });
        parentCube.add(childCube);
        cubes.push(childCube);
        // 限制最大数量20
        if (cubes.length > 20) {
            parentCube.remove(cubes[0]);
            cubes.shift();
        }

    },
}
// 创建GUI
const gui = new GUI();
// 父元素线框模式
gui.add(parentCube.material, 'wireframe').name("父元素线框模式");
// 父元素颜色调节
let colorParams = { parentColor: "0xff0000" };
gui.addColor(colorParams, 'parentColor').name("父元素颜色").onChange((val) => {
    parentCube.material.color.set(val);
});

// 添加按钮
gui.add(eventObj, 'Fullscreen').name("全屏");
gui.add(eventObj, 'ExitFullscreen').name("退出全屏");
gui.add(eventObj, 'AutoRotate').name("自动旋转");
gui.add(eventObj, 'AddCube').name("添加cube");
// 创建立方体
let cubeFolder = gui.addFolder('立方体');





// 双击控制屏幕进入全屏，退出全屏
window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    if (!fullScreenElement) {
        // 让画布对象全屏
        renderer.domElement.requestFullscreen();
    } else {
        // 退出全屏，使用document对象
        document.exitFullscreen();
    }
});

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