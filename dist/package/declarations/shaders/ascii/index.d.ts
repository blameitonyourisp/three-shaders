export class AsciiPass extends Pass {
    /**
     *
     * @param {THREE.WebGLRenderer} renderer
     * @param {object} obj
     * @param {number} obj.width
     * @param {number} obj.height
     */
    constructor(renderer: THREE.WebGLRenderer, { width, height }?: {
        width: number;
        height: number;
    });
    uniforms: {
        tDiffuse: {
            value: THREE.Texture | null;
        };
        time: {
            value: number;
        };
        u_resolution: {
            value: THREE.Vector2;
        };
    };
    material: THREE.ShaderMaterial;
    fsQuad: FullScreenQuad;
    /**
     *
     * @param {THREE.WebGLRenderer} renderer
     * @param {THREE.WebGLRenderTarget} writeBuffer
     * @param {THREE.WebGLRenderTarget} readBuffer
     * @param {number} deltaTime
     */
    render(renderer: THREE.WebGLRenderer, writeBuffer: THREE.WebGLRenderTarget, readBuffer: THREE.WebGLRenderTarget, deltaTime: number): void;
}
import { Pass } from "three/addons/postprocessing/Pass.js";
import * as THREE from "three";
import { FullScreenQuad } from "three/addons/postprocessing/Pass.js";
