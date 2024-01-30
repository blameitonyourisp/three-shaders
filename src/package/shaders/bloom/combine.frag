varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform sampler2D tBlur;

void main() {
    vec4 fragColor = texture(tDiffuse, vUv);
    vec4 blurColor = texture(tBlur, vUv);

    gl_FragColor = (fragColor + blurColor) * 0.75;
}
