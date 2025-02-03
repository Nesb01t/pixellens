<script setup lang="ts">
import { MeshBasicMaterial, Vector3, GreaterDepth, OneFactor, ZeroFactor, CustomBlending, Color } from 'three';
import { computed } from 'vue';
import type { IHologramTip } from '~/types/machine';

const props = defineProps<{
  data: IHologramTip;
}>();

const position = computed<Vector3>(() => {
  const vecP = props.data.position;
  return new Vector3(vecP.x, vecP.y, vecP.z);
});

const plainColorMatProps = {
  baseMaterial: MeshBasicMaterial,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.72, 0.6, 0.6, 1);
    }
    `,
};

const transparentMatProps = {
  baseMaterial: MeshBasicMaterial,
  transparent: true,
  depthWrite: true,
  depthTest: true,
  depthFunc: GreaterDepth,
  blending: CustomBlending,
  blendSrc: OneFactor,
  blendDst: ZeroFactor,
  uniforms: {
    u_Time: { value: 0 },
    u_FresnelPower: { value: 1.5 },
    u_FresnelColor: { value: new Color(0.72, 0.7, 0.7) },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;

      vNormal = normalize(normalMatrix * normal); // world space 法线
      vViewDir = normalize(-viewPosition.xyz); // 相机 -> 顶点

      gl_Position = projectionMatrix * viewPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform vec3 u_FresnelColor;
    uniform float u_FresnelPower;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vViewDir);

      float fresnel = pow(1.0 - max(dot(N, V), 0.2), u_FresnelPower);
      float oneMinus = 1.0 - fresnel;

      gl_FragColor = vec4(u_FresnelColor * oneMinus, pow(oneMinus, 0.7));
    }
    `,
};
</script>

<template>
  <TresMesh :render-order="5" :position="position">
    <TresSphereGeometry :args="[0.06, 32, 32]" />
    <TresShaderMaterial v-bind="transparentMatProps" />
  </TresMesh>
  <TresMesh :position="position">
    <TresSphereGeometry :args="[0.085, 32, 32]" />
    <TresShaderMaterial v-bind="plainColorMatProps" />
  </TresMesh>
</template>

<style lang="scss" scoped></style>
