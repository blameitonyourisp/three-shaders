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
 * @file Generate new ThreeJS EffectComposer from a given set of shader passes.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import * as THREE from "three"
/* eslint-disable-next-line no-duplicate-imports -- Duplicate import required
since the following import is for types only. */
import { Pass } from "three/addons/postprocessing/EffectComposer.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {THREE.WebGLRenderer} renderer
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {Pass[]} passes
 * @returns {EffectComposer}
 */
const getEffectComposer = (renderer, scene, camera, passes = []) => {
    const composer = new EffectComposer(renderer)

    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    for (const pass of passes) { composer.addPass(pass) }

    return composer
}

/**
 *
 * @param {EffectComposer} composer
 * @param {Pass[]} passes
 */
const updateEffectComposer = (composer, passes) => {
    for (const pass of composer.passes.slice(1)) { composer.removePass(pass) }
    for (const pass of passes) { composer.addPass(pass) }
}

// @@exports
export { getEffectComposer, updateEffectComposer }
