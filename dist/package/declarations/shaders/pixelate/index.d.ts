export class PixelatePass extends Pass {
    constructor({ width, height }?: {
        width?: number | undefined;
        height?: number | undefined;
    });
    uniforms: {
        tDiffuse: {
            value: THREE.Texture | null;
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
     */
    render(renderer: THREE.WebGLRenderer, writeBuffer: THREE.WebGLRenderTarget, readBuffer: THREE.WebGLRenderTarget): void;
}
import { Pass } from "three/addons/postprocessing/Pass.js";
import * as THREE from "three";
import { FullScreenQuad } from "three/addons/postprocessing/Pass.js";
