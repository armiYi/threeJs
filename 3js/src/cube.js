// 导入three.js
import * as THREE from 'three';
export class CubeGeometry {
    // 静态变量
    static argc = 'CubeGeometry';
    // 初始化
    constructor() {
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    }

    init(params) {
        // 创建几何体
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // 创建材质
        if (params.color) {
            this.material = new THREE.MeshBasicMaterial(params.color);
        }
        // 创建网格
        let cube = new THREE.Mesh(geometry, this.material);
        // 设置父元素材质为线框模式
        this.material.wireframe = params.wireframe;

        // 基于父元素的位置：局部坐标
        if (params.position) {
            cube.position.set(
                params.position.x,
                params.position.y,
                params.position.z);
        }
        // 设置立方体的放大
        cube.scale.set(2, 2, 2);

        return cube;
    };

    //     // 控制立方体位置
    // let folder = gui.addFolder('立方体位置');
    // folder.add(childCube.position, 'x')
    //     .min(-10)
    //     .max(10)
    //     .step(0.1)
    //     .name("立方体x轴")
    //     .onChange((val) => {
    //         console.log("x:", val)
    //     });
    // folder.add(childCube.position, 'y')
    //     .min(-10)
    //     .max(10)
    //     .step(0.1)
    //     .name("立方体y轴")
    //     .onFinishChange((val) => {
    //         console.log("y:", val)
    //     });
    // folder.add(childCube.position, 'z')
    //     .min(-10)
    //     .max(10)
    //     .step(0.1)
    //     .name("立方体z轴");

}