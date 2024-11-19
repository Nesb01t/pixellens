uniform float iTime; // 时间变量，用于动画效果
uniform vec2 iResolution; // 画布分辨率

void main() {
    // 将屏幕坐标转换为[-1, 1]范围内的UV坐标
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y; // 保持纵横比

    // 创建波动效果
    float wave = sin(uv.x * 10.0 + iTime) * 0.03 + sin(uv.y * 10.0 + iTime) * 0.03;

    // 设置颜色
    vec3 color = vec3(0.0, 0.2 + wave * 0.6, 0.5); // 水的颜色

    gl_FragColor = vec4(color, 0.1);
}