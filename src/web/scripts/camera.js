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
 * @file Create standard perspective camera, and attach to renderer.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// @@body
/**
 *
 * @param {THREE.WebGLRenderer} renderer
 * @param {object} obj
 * @param {number} [obj.fov]
 * @param {THREE.Vector3} [obj.position]
 * @returns {{camera:THREE.Camera, cameraController:OrbitControls}}
 */
const getCamera = (renderer, {
    fov = 75,
    position = new THREE.Vector3(10, 10, 10)
} = {}) => {
    // Set up standard perspective camera and camera controller.
    const { width, height } = renderer.getSize(new THREE.Vector2())
    const camera = new THREE.PerspectiveCamera(fov, width / height)
    const cameraController = new OrbitControls(camera, renderer.domElement)
    camera.position.set(position.x, position.y, position.z)

    return { camera, cameraController }
}

// @@exports
export { getCamera }
