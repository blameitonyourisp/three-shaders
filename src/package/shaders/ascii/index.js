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
 * @file ThreeJS shader pass wrapper around ascii shader.
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
import fragmentShader from "./shader.frag"

// @@body
class AsciiPass extends Pass {
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

        const shader = {
            uniforms: {
                tDiffuse: { value: /** @type {?THREE.Texture} */ (null) },
                time: { value: 0 },
                u_resolution: { value: new THREE.Vector2(width, height) }
            },
            vertexShader,
            fragmentShader
        }

        this.uniforms = THREE.UniformsUtils.clone(shader.uniforms)
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader
        })
        this.fsQuad = new FullScreenQuad(this.material)
    }

    /**
     *
     * @param {THREE.WebGLRenderer} renderer
     * @param {THREE.WebGLRenderTarget} writeBuffer
     * @param {THREE.WebGLRenderTarget} readBuffer
     * @param {number} deltaTime
     */
    render(renderer, writeBuffer, readBuffer, deltaTime) {
        this.uniforms["tDiffuse"].value = readBuffer.texture
        this.uniforms.time.value += deltaTime

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
export { AsciiPass }
