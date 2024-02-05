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
 * @file Render sample scene for demonstrating shaders.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

// @@imports-package
import { AsciiPass, BloomPass, PixelatePass } from "../../package/index.js"

// @@imports-module
import { getCamera } from "./camera.js"
import { getEffectComposer, updateEffectComposer } from "./composer.js"
import { addPointLights, updateLightIntensity } from "./lights.js"
import { getRenderer } from "./renderer.js"
import "./icons.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Pass } from "three/addons/postprocessing/EffectComposer.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
const DEFAULT_EFFECT = "ASCII"

const container = document.querySelector(".three-container")
const renderer = getRenderer(/** @type {HTMLDivElement} */ (container))
const { camera, cameraController } = getCamera(renderer)
const scene = new THREE.Scene()

/** @type {THREE.AnimationMixer|undefined} */
let mixer
const loader = new GLTFLoader()
loader.load("./models/lemming.gltf",
    gltf => {
        scene.add(gltf.scene)
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[2])
        action.play()
    })

addPointLights(scene, [
    new THREE.Vector3(50, 50, 50),
    new THREE.Vector3(50, 50, - 50),
    new THREE.Vector3(- 50, 50, 50),
    new THREE.Vector3(- 50, 50, - 50)
])

const nav = /** @type {HTMLDivElement} */ (document.querySelector(".nav"))

const navIcon = /** @type {HTMLDivElement} */
    (document.querySelector(".nav-icon"))
navIcon.addEventListener("click", () => {
    navIcon.classList.toggle("closed")
    nav.classList.toggle("closed")
})

/** @type {Object.<string, {lightIntensity:number, passes:Pass[]}>} */
const effects = {
    "None": { lightIntensity: 450, passes: [] },
    "ASCII": { lightIntensity: 550, passes: [new AsciiPass(renderer)] },
    "Bloom": { lightIntensity: 500, passes: [new BloomPass(renderer)] },
    "Pixelate": { lightIntensity: 450, passes: [new PixelatePass(renderer)] }
}
const defaultEffect = effects[DEFAULT_EFFECT]

const selector = /** @type {HTMLSelectElement} */
    (document.querySelector("#shader"))
for (const name in effects) {
    const option = document.createElement("option")
    option.innerText = name
    if (name === DEFAULT_EFFECT) { option.selected = true }
    selector.appendChild(option)
}

selector.addEventListener("change", () => {
    const name = selector.value
    const effect = effects[name]
    updateEffectComposer(composer, effect.passes)
    updateLightIntensity(scene, effect.lightIntensity)
    slider.value = `${effect.lightIntensity}`
})

const slider = /** @type {HTMLInputElement} */
    (document.querySelector("#intensity"))
slider.addEventListener("change", () => {
    updateLightIntensity(scene, parseInt(slider.value))
})

const clock = new THREE.Clock()
const composer = getEffectComposer(renderer, scene, camera)

updateEffectComposer(composer, defaultEffect.passes)
updateLightIntensity(scene, defaultEffect.lightIntensity)
slider.value = `${defaultEffect.lightIntensity}`

const animate = () => {
    requestAnimationFrame(animate)
    if (mixer) { mixer.update(clock.getDelta()) }
    cameraController.update()
    composer.render()
}
animate()

// @@no-exports
