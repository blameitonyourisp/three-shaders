varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform vec2 u_resolution;

void main() {
    vec4 previousPassColor = texture2D(tDiffuse, vUv);
    vec3 previousColor = previousPassColor.rgb;
    vec2 pixel = gl_FragCoord.xy;

    float pixelSize = 5.0;
    vec2 cell = vec2(
        floor(pixel.x/pixelSize) * pixelSize,
        floor(pixel.y/pixelSize) * pixelSize
    );

    vec3 cellSample = texture2D(tDiffuse, cell/u_resolution.xy).rgb;

    gl_FragColor = vec4(cellSample, 1.0);
}
