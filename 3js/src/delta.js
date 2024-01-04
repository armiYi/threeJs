// 导入three.js
import * as THREE from 'three';
export class DeltaGeometry {

    constructor() {
        this.vertices = [
            -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0,
            1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0
        ];
        this.vertices_ = [
            -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0
        ];
        this.color = {
            color: 0x0000ff,
            wireframe: true,
            // side: THREE.DoubleSide
        };

    }

    init() {
        // 创建三角面
        const geometry = new THREE.BufferGeometry();
        // 使用索引绘制
        const vertices = new Float32Array(this.vertices_);
        // const vertices = new Float32Array(this.vertices);
        // 创建顶点属性
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        // 创建索引
        const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
        // 创建索引属性
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        // 创建材质
        const material = new THREE.MeshBasicMaterial(this.color);
        // 设置父元素材质为线框模式
        const plane = new THREE.Mesh(geometry, material);

        return plane;
    }

}