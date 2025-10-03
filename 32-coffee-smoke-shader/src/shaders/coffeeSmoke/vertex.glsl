varying vec2 vUv;
uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform float uTwistFrequency;
uniform float uTwistStrength;
uniform float uTwistSpeed;

vec2 rotate(vec2 uv, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, -s, s, c);
    return m * uv;
}

void main()
{
    vec3 newPosition = position;


    // Twist
    float twistPerlin = texture(
        uPerlinTexture,
        vec2(0.5, uv.y * uTwistFrequency - uTime * uTwistSpeed)
    ).r;
    float angle = twistPerlin * uTwistStrength;
    newPosition.xz = rotate(newPosition.xz, angle);

    // Wind
    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5,
        texture(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.5
    );
    windOffset *= pow(uv.y, 2.0) * 10.0;
    newPosition.xz += windOffset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
}
