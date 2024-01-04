// 导入threejs
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

        return cube;
    };


}