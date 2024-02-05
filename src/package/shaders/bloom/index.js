// Copyright (c) 2024 James Reid. All rights reserved.
//
// This source code file is licensed under the terms of the MIT license, a copy
// of which may be found in the LICENSE.md file in the root of this repository.
//
// For a template copy of the license see one of the following 3rd party sites:
//      - <https://opensource.org/licenses/MIT>
//      - <https://choosealicense.com/licenses/mit>
//      - <https://spdx.org/licenses/MIT>

/**
 * @file ThreeJS shader pass wrapper around bloom shader.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import * as THREE from "three"
import { Pass, FullScreenQuad } from "three/addons/postprocessing/Pass.js"

// @@imports-module
// @ts-expect-error: File is a glsl shader which will be loaded by rollup.
import vertexShader from "./shader.vert"
// @ts-expect-error: File is a glsl shader which will be loaded by rollup.
import blurFragmentShader from "./blur.frag"
// @ts-expect-error: File is a glsl shader which will be loaded by rollup.
import combineFragmentShader from "./combine.frag"
// @ts-expect-error: File is a glsl shader which will be loaded by rollup.
import filterFragmentShader from "./filter.frag"

// @@body
class BloomPass extends Pass {
    /**
     *
     * @param {THREE.WebGLRenderer} renderer
     * @param {object} obj
     * @param {number} obj.width
     * @param {number} obj.height
     */
    constructor(
        renderer,
        { width, height } = renderer.getSize(new THREE.Vector2())
    ) {
        super()

        this.renderTargetA = new THREE.WebGLRenderTarget(width, height, {
            type: THREE.HalfFloatType
        })
        this.renderTargetB = new THREE.WebGLRenderTarget(width, height, {
            type: THREE.HalfFloatType
        })

        this.blurUniforms = THREE.UniformsUtils.clone({
            tDiffuse: { value: /** @type {?THREE.Texture} */ (null) },
            u_resolution: { value: new THREE.Vector2(width, height) },
            uKernel: { value: [0.0625, 0.25, 0.375, 0.25, 0.0625] },
            uHorizontal: { value: true }
        })
        this.blurMaterial = new THREE.ShaderMaterial({
            uniforms: this.blurUniforms,
            vertexShader,
            fragmentShader: blurFragmentShader
        })

        this.combineUniforms = THREE.UniformsUtils.clone({
            tDiffuse: { value: /** @type {?THREE.Texture} */ (null) },
            tBlur: { value: /** @type {?THREE.Texture} */ (null) },
            u_resolution: { value: new THREE.Vector2(width, height) }
        })
        this.combineMaterial = new THREE.ShaderMaterial({
            uniforms: this.combineUniforms,
            vertexShader,
            fragmentShader: combineFragmentShader
        })

        this.filterUniforms = THREE.UniformsUtils.clone({
            tDiffuse: { value: /** @type {?THREE.Texture} */ (null) },
            u_resolution: { value: new THREE.Vector2(width, height) }
        })
        this.filterMaterial = new THREE.ShaderMaterial({
            uniforms: this.filterUniforms,
            vertexShader,
            fragmentShader: filterFragmentShader
        })

        this.fsQuad = new FullScreenQuad()
    }

    /**
     *
     * @param {THREE.WebGLRenderer} renderer
     * @param {THREE.WebGLRenderTarget} writeBuffer
     * @param {THREE.WebGLRenderTarget} readBuffer
     */
    render(renderer, writeBuffer, readBuffer) {
        // Filter
        this.fsQuad.material = this.filterMaterial
        this.filterUniforms["tDiffuse"].value = readBuffer.texture

        renderer.setRenderTarget(this.renderTargetA)
        renderer.clear()
        this.fsQuad.render(renderer)

        // Set blur material
        this.fsQuad.material = this.blurMaterial

        // Blur 1 - split blur into new method
        this.blurUniforms["tDiffuse"].value = this.renderTargetA.texture
        renderer.setRenderTarget(this.renderTargetB)
        renderer.clear()
        this.fsQuad.render(renderer)

        // Blur 2
        this.blurUniforms["tDiffuse"].value = this.renderTargetB.texture
        this.blurUniforms["uHorizontal"].value = false
        renderer.setRenderTarget(this.renderTargetA)
        renderer.clear()
        this.fsQuad.render(renderer)

        // Set combine material
        this.fsQuad.material = this.combineMaterial
        this.combineUniforms["tDiffuse"].value = readBuffer.texture
        this.combineUniforms["tBlur"].value = this.renderTargetA.texture

        if (this.renderToScreen) {
            renderer.setRenderTarget(null)
            this.fsQuad.render(renderer)
        }
        else {
            renderer.setRenderTarget(writeBuffer)
            if (this.clear) { renderer.clear() }
            this.fsQuad.render(renderer)
        }
    }
}

// @@exports
export { BloomPass }
