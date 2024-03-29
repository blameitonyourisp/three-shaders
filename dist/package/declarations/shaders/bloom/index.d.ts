export class BloomPass extends Pass {
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
    renderTargetA: THREE.WebGLRenderTarget<THREE.Texture>;
    renderTargetB: THREE.WebGLRenderTarget<THREE.Texture>;
    blurUniforms: {
        tDiffuse: {
            value: THREE.Texture | null;
        };
        u_resolution: {
            value: THREE.Vector2;
        };
        uKernel: {
            value: number[];
        };
        uHorizontal: {
            value: boolean;
        };
    };
    blurMaterial: THREE.ShaderMaterial;
    combineUniforms: {
        tDiffuse: {
            value: THREE.Texture | null;
        };
        tBlur: {
            value: THREE.Texture | null;
        };
        u_resolution: {
            value: THREE.Vector2;
        };
    };
    combineMaterial: THREE.ShaderMaterial;
    filterUniforms: {
        tDiffuse: {
            value: THREE.Texture | null;
        };
        u_resolution: {
            value: THREE.Vector2;
        };
    };
    filterMaterial: THREE.ShaderMaterial;
    fsQuad: FullScreenQuad;
    /**
     *
     * @param {THREE.WebGLRenderer} renderer
     * @param {THREE.WebGLRenderTarget} writeBuffer
     * @param {THREE.WebGLRenderTarget} readBuffer
     */
    render(renderer: THREE.WebGLRenderer, writeBuffer: THREE.WebGLRenderTarget, readBuffer: THREE.WebGLRenderTarget): void;
}
import { Pass } from "three/addons/postprocessing/Pass.js";
import * as THREE from "three";
import { FullScreenQuad } from "three/addons/postprocessing/Pass.js";
