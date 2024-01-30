varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform vec2 u_resolution;
uniform float uKernel[5];
uniform bool uHorizontal;

void main() {
    vec4 fragColor = texture2D(tDiffuse, vUv);
    vec4 blurColor;

    for (int i = 0; i < 5; i ++) {
        if (uHorizontal) {
            float offset = (float(i) - (5.0 - 1.0) / 2.0) / u_resolution.x;
            vec2 pixel = vec2(vUv.x + offset, vUv.y);
            blurColor += texture(tDiffuse, pixel) * uKernel[i];
        }
        else {
            float offset = (float(i) - (5.0 - 1.0) / 2.0) / u_resolution.y;
            vec2 pixel = vec2(vUv.x, vUv.y + offset);
            blurColor += texture(tDiffuse, pixel) * uKernel[i];
        }
    }

    gl_FragColor = blurColor;
}
