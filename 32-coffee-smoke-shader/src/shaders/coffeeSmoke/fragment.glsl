uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform float uSmokeSpeed;
uniform vec3 uSmokeColor;
uniform float uSmokeThreshold;
uniform vec2 uLeftEdge;
uniform vec2 uRightEdge;
uniform vec2 uTopEdge;
uniform vec2 uBottomEdge;


varying vec2 vUv;

void main()
{
    // scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * uSmokeSpeed;
    smokeUv.y = mod(smokeUv.y, 1.0);

    // smoke
    float smoke = texture(uPerlinTexture, smokeUv).r;

    // remap
    // https://www.desmos.com/calculator/xykhidbkbg
    smoke = smoothstep(uSmokeThreshold, 1.0, smoke);

    // smoothed edges
    smoke *= smoothstep(uLeftEdge.x, uLeftEdge.y, vUv.x);
    smoke *= smoothstep(uRightEdge.x, uRightEdge.y, vUv.x);
    smoke *= smoothstep(uTopEdge.x, uTopEdge.y, vUv.y);
    smoke *= smoothstep(uBottomEdge.x, uBottomEdge.y, vUv.y);
    // smoke *= smoothstep(0.0, 0.1, vUv.x);
    // smoke *= smoothstep(1.0, 0.9, vUv.x);
    // smoke *= smoothstep(0.0, 0.1, vUv.y);
    // smoke *= smoothstep(1.0, 0.9, vUv.y);

    // final color
    gl_FragColor = vec4(uSmokeColor, smoke);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
