// Chladni Pattern Vertex Shader
// Computes particle physics on GPU for 10,000+ particles at 60fps

uniform float uTime;
uniform float uN1;  // Current pattern n
uniform float uM1;  // Current pattern m
uniform float uN2;  // Target pattern n
uniform float uM2;  // Target pattern m
uniform float uTransition; // 0 to 1, pattern interpolation
uniform float uForceStrength;
uniform float uDamping;
uniform vec2 uMouse; // Normalized mouse position
uniform float uMouseRadius;
uniform float uMouseForce;
uniform float uChaos; // 0 to 1, randomness during transitions

attribute vec3 velocity;

varying float vDistance; // Distance from nodal line (for glow effect)

const float PI = 3.14159265359;

// Calculate Chladni pattern value at position
// Returns 0 at nodal lines (where particles collect)
float chladniValue(vec2 pos, float n, float m) {
    return cos(n * PI * pos.x) * cos(m * PI * pos.y) - 
           cos(m * PI * pos.x) * cos(n * PI * pos.y);
}

// Calculate gradient (direction toward nearest nodal line)
vec2 chladniGradient(vec2 pos, float n, float m) {
    float h = 0.001;
    float val = chladniValue(pos, n, m);
    float valX = chladniValue(pos + vec2(h, 0.0), n, m);
    float valY = chladniValue(pos + vec2(0.0, h), n, m);
    
    vec2 grad = vec2(-(valX - val) / h, -(valY - val) / h);
    
    // Scale by distance from nodal line
    float strength = abs(val);
    grad *= strength;
    
    // Normalize
    float mag = length(grad);
    if (mag > 0.0) {
        grad /= mag;
    }
    
    return grad;
}

// Calculate force pushing particle toward nodal line
vec2 chladniForce(vec2 pos, float n, float m, float strength) {
    float val = chladniValue(pos, n, m);
    vec2 grad = chladniGradient(pos, n, m);
    float forceMag = abs(val) * strength;
    return grad * forceMag;
}

// Interpolate force between two patterns
vec2 interpolatedForce(vec2 pos, float n1, float m1, float n2, float m2, float t, float strength) {
    vec2 force1 = chladniForce(pos, n1, m1, strength);
    vec2 force2 = chladniForce(pos, n2, m2, strength);
    
    // Smooth cubic easing
    float eased = t < 0.5 
        ? 4.0 * t * t * t 
        : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    
    return mix(force1, force2, eased);
}

// Pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec3 pos = position;
    vec3 vel = velocity;
    
    // Normalized position for Chladni calculation (0 to 1)
    vec2 normalizedPos = pos.xy * 0.5 + 0.5;
    
    // Calculate Chladni force (interpolated between patterns)
    vec2 force = interpolatedForce(
        normalizedPos, 
        uN1, uM1, 
        uN2, uM2, 
        uTransition, 
        uForceStrength
    );
    
    // Add mouse repulsion if mouse is active
    if (uMouseRadius > 0.0) {
        vec2 toMouse = normalizedPos - uMouse;
        float dist = length(toMouse);
        
        if (dist < uMouseRadius && dist > 0.001) {
            float repelStrength = (1.0 - dist / uMouseRadius) * uMouseForce;
            force += (toMouse / dist) * repelStrength;
        }
    }
    
    // Add chaos during transitions
    if (uChaos > 0.0) {
        vec2 randomForce = vec2(
            random(normalizedPos + uTime) - 0.5,
            random(normalizedPos.yx + uTime) - 0.5
        );
        force += randomForce * uChaos * 0.01;
    }
    
    // Update velocity with damping
    float deltaTime = 0.016; // ~60fps
    vel.xy = (vel.xy + force * deltaTime) * uDamping;
    
    // Update position
    pos.xy += vel.xy * deltaTime;
    
    // Wrap around edges (torus topology)
    pos.xy = fract((pos.xy * 0.5 + 0.5)) * 2.0 - 1.0;
    
    // Calculate distance from nodal line for glow effect
    float val1 = chladniValue(normalizedPos, uN1, uM1);
    float val2 = chladniValue(normalizedPos, uN2, uM2);
    vDistance = abs(mix(val1, val2, uTransition));
    
    // Output position
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Point size (grain-like, 1-2px)
    gl_PointSize = 1.5;
}
