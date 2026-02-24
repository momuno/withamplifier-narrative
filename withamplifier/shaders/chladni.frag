// Chladni Pattern Fragment Shader
// Renders grain-like particles with glow on nodal lines

uniform vec3 uColor;
uniform float uOpacity;
uniform float uGlowIntensity;

varying float vDistance; // Distance from nodal line

void main() {
    // Create circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    // Soft circle with antialiasing
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    // Add glow effect for particles near nodal lines
    // vDistance is 0 at nodal lines, increases away from them
    float nodal = 1.0 - smoothstep(0.0, 0.15, vDistance);
    float glow = nodal * uGlowIntensity;
    
    // Combine base alpha with glow
    alpha *= (uOpacity + glow);
    
    // Brighten color slightly at nodal lines
    vec3 finalColor = uColor * (1.0 + glow * 0.3);
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(finalColor, alpha);
}
