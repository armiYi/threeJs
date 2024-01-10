// 导入three.js
import * as THREE from 'three';
export class Common {

    // 随机数
    static getRandomInteger(min, max) {
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        if (num == 0) {
            num = this.getRandomInteger(min, max);
        }
        return num;
    }
    // 随机颜色
    static getRandomColor() {
        const color = new THREE.Color();
        color.setRGB(Math.random(), Math.random(), Math.random());
        return color;
    }

}