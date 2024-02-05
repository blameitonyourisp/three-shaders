import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import * as THREE from 'three';

declare class AsciiPass extends Pass {
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

declare class BloomPass extends Pass {
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

declare class PixelatePass extends Pass {
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

export { AsciiPass, BloomPass, PixelatePass };
