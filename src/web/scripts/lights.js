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
 * @file Methods for adding and updating scene lights.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import * as THREE from "three"

// @@body
/**
 *
 * @param {THREE.Scene} scene
 * @param {THREE.Vector3[]} positions
 */
const addPointLights = (scene, positions) => {
    for (const position of positions) {
        const light = new THREE.PointLight()
        light.decay = 1.125
        light.position.set(position.x, position.y, position.z)
        scene.add(light)
    }
}

/**
 *
 * @param {THREE.Scene} scene
 * @param {number} intensity
 */
const updateLightIntensity = (scene, intensity) => {
    // @ts-expect-error - property `isLight` does not exist on `Object3D`, but
    // will exist on scene children light objects.
    for (const light of scene.children.filter(child => child.isLight)) {
        /** @type {THREE.Light} */ (light).intensity = intensity
    }
}

// @@exports
export { addPointLights, updateLightIntensity }
