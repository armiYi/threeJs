// 父类测试类
import { CubeGeometry } from './cube.js';
// 三角形测试类
import { DeltaGeometry } from './delta.js';

// 导入threejs
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

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
const childCube = cube.init({ wireframe: false, color: { color: 0x00ff00 } });
const deltaFace = delta.init();
// 添加到场景
scene.add(parentCube);
scene.add(deltaFace);
parentCube.add(childCube);

parentCube.position.set(-5, 0, 0)
// 基于父元素的位置：局部坐标
childCube.position.set(3, 0, 0)
// 设置立方体的放大
childCube.scale.set(2, 2, 2)

// 设置相机位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
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
    controls.update();
    requestAnimationFrame(render);
    // 旋转
    childCube.rotation.x += 0.01;
    childCube.rotation.y += 0.01;
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
    }
}
// 创建GUI
const gui = new GUI();
// 父元素线框模式
// gui.add(parentMaterial, 'wireframe').name("父元素线框模式");
// 父元素颜色调节
let colorParams = { cubeColor: "0x00ff00" };
gui.addColor(colorParams, 'cubeColor').name("父元素颜色").onChange((val) => {
    childCube.material.color.set(val);
});

// 添加按钮
gui.add(eventObj, 'Fullscreen').name("全屏");
gui.add(eventObj, 'ExitFullscreen').name("退出全屏");
gui.add(eventObj, 'AutoRotate').name("自动旋转");
// 创建立方体
let cubeFolder = gui.addFolder('立方体');

// 控制立方体位置
let folder = gui.addFolder('立方体位置');
folder.add(childCube.position, 'x')
    .min(-10)
    .max(10)
    .step(0.1)
    .name("立方体x轴")
    .onChange((val) => {
        console.log("x:", val)
    });
folder.add(childCube.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name("立方体y轴")
    .onFinishChange((val) => {
        console.log("y:", val)
    });
folder.add(childCube.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name("立方体z轴");


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