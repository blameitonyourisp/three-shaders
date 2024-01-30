varying vec2 vUv;

uniform sampler2D tDiffuse;

void main() {
    vec4 fragColor = texture2D(tDiffuse, vUv);
    vec4 bloomColor;

    float brightness = dot(fragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    float threshold = 0.75;

    if (brightness > threshold) {
        bloomColor = fragColor.rgba;
    }
    else {
        bloomColor = vec4(0.0, 0.0, 0.0, fragColor.a);
    }

    gl_FragColor = bloomColor;
}
