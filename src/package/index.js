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
 * @file Package entrypoint.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
/**
 * @todo Allow pixel size in pixelate shader to be user-defined.
 * @todo Allow kernel size and sigma value (used for generating gaussian kernel
 *      values) to be user defined. See the following current implementations
 *      of the default bloom pass in ThreeJS:
 *          - https://github.com/mrdoob/three.js/blob/dev/examples/jsm/postprocessing/BloomPass.js
 *          - https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/ConvolutionShader.js
 * @todo Allow "font" (i.e. available characters) in ascii shader to be user
 *      defined:
 *          - add an integer array for all characters with a max length of 256
 *            or similar, containing characters ordered by sets of pixel number
 *          - add an integer array of length 25 with containing the indices of
 *            where each character set *ends*
 *          - modify shader to choose a character from this array
 *          - add a default "font" containing 1 character for each pixel count,
 *            and an extended "font" containing all characters
 * @todo Clean up inconsistent/short variable naming across glsl shader files.
 * @todo Document shader files.
 * @todo Document shader pass wrapper classes.
 */

// @@exports
export * from "./shaders/index.js"
