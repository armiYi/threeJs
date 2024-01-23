// 添加摩擦系数  滑出plane自动移除
// 可以选择并移动  模型边界线EdgesGeometry
// plane可以单独设置倾斜角度
// gui 设置单选、下拉菜单等
// 加载gltf和glb并增加进度条


// 导入three.js
import * as THREE from 'three';
import { Common } from './common.js';
export class CubeGeometry {
    // 静态变量
    static argc = 'CubeGeometry';
    // 初始化
    constructor() {
        this.material = [
            new THREE.MeshBasicMaterial({ color: Common.getRandomColor() }),
            new THREE.MeshBasicMaterial({ color: Common.getRandomColor() }),
            new THREE.MeshBasicMaterial({ color: Common.getRandomColor() }),
            new THREE.MeshBasicMaterial({ color: Common.getRandomColor() }),
            new THREE.MeshBasicMaterial({ color: Common.getRandomColor() }),
            new THREE.MeshBasicMaterial({ color: Common.getRandomColor() }),
        ];
    }

    // 控制立方体
    cubePosition(params, childCube) {
        let folderName = '立方体_' + params.cubeID;
        childCube.name = folderName;
        childCube.flag = false;
        childCube.castShadow = true;
        childCube.receiveShadow = true;
        let folder = params.gui.addFolder(folderName);
        const folderState = {
            delete: function () {
                params.parentCube.remove(childCube);
                folder.destroy();
            },
            rotation: function () {
                childCube.flag = !childCube.flag;
            }
        };
        folder.add(childCube.material, 'wireframe').name("线框模式");
        folder.add(folderState, 'rotation').name("开启旋转");
        folder.add(childCube.position, 'x')
            .min(-10)
            .max(10)
            .step(0.1)
            .name("立方体x轴")
            .onChange((val) => {
                // console.log("x:", val)
            });
        folder.add(childCube.position, 'y')
            .min(-10)
            .max(10)
            .step(0.1)
            .name("立方体y轴")
            .onFinishChange((val) => {
                // console.log("y:", val)
            });
        folder.add(childCube.position, 'z')
            .min(-10)
            .max(10)
            .step(0.1)
            .name("立方体z轴");
        folder.add(folderState, 'delete').name('删除');

    }

    init(params) {
        // 创建几何体
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // 创建材质
        if (params.color) {
            this.material = new THREE.MeshBasicMaterial(params.color);
            // 设置材质为线框模式
            this.material.wireframe = params.wireframe;
        }
        // 创建立方体
        let cube = new THREE.Mesh(geometry, this.material);

        // 基于父元素的位置：局部坐标
        if (params.position) {
            cube.position.set(
                params.position.x,
                params.position.y,
                params.position.z);
        }
        // 设置立方体的放大
        // cube.scale.set(2, 2, 2);
        if (params.gui) { this.cubePosition(params, cube) }
        return cube;
    };

}