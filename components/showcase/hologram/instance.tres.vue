<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core';
import {
  MeshBasicMaterial,
  Vector3,
  GreaterDepth,
  OneFactor,
  CustomBlending,
  Color,
  OneMinusDstColorFactor,
} from 'three';
import { computed } from 'vue';
import type { IHologramTip } from '~/types/machine';

const props = defineProps<{
  data: IHologramTip;
}>();

const position = computed<Vector3>(() => {
  const vecP = props.data.position;
  return new Vector3(vecP.x, vecP.y, vecP.z);
});

const randBaseColor = () => {
  const r = Math.random() * 0.5 + 0.5;
  const g = Math.random() * 0.5 + 0.5;
  const b = Math.random() * 0.5 + 0.5;
  return new Color(r, g, b);
};

const plainColorMatProps = {
  baseMaterial: MeshBasicMaterial,
  uniforms: {
    u_Time: { value: 0 },
    u_Color: { value: randBaseColor() },
  },
  fragmentShader: `
    uniform float u_Time;
    uniform vec3 u_Color;
    void main() {
      float r = (sin(u_Time * 2.0) * 0.2 + 0.5) * u_Color.r;
      float g = (cos(u_Time * 2.0) * 0.2 + 0.5) * u_Color.g;
      float b = (sin(u_Time * 3.0) * 0.2 + 0.5) * u_Color.b;
      float rand = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
      vec3 color = vec3(r, g, b) * rand;
      gl_FragColor = vec4(color, 1.0);
    }
    `,
};

const transparentMatProps = {
  baseMaterial: MeshBasicMaterial,
  userData: props.data,
  transparent: true,
  depthWrite: true,
  depthTest: true,
  depthFunc: GreaterDepth,
  blending: CustomBlending,
  blendSrc: OneMinusDstColorFactor,
  blendDst: OneFactor,
  uniforms: {
    u_Time: { value: 0 },
    u_FresnelPower: { value: 1.2 },
    u_FresnelColor: { value: new Color(0.92, 0.9, 0.9) },
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
    uniform float u_Time;
    uniform vec3 u_FresnelColor;
    uniform float u_FresnelPower;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vViewDir);

      float time = sin(u_Time) * 0.2 + 0.4;
      float fresnel = pow(1.0 - max(dot(N, V), time), u_FresnelPower);
      float oneMinus = 1.0 - fresnel;

      gl_FragColor = vec4(u_FresnelColor * oneMinus, oneMinus);
    }
    `,
};

useRenderLoop().onLoop(({ delta }) => {
  transparentMatProps.uniforms.u_Time.value += delta * 4;
  plainColorMatProps.uniforms.u_Time.value += delta;
});
</script>

<template>
  <TresMesh :render-order="5" :position="position">
    <TresIcosahedronGeometry :args="[0.065, 0]" />
    <TresShaderMaterial v-bind="transparentMatProps" />
  </TresMesh>
  <TresMesh :position="position" name="Tips" :user-data="data">
    <TresIcosahedronGeometry :args="[0.1, 0]" />
    <TresShaderMaterial v-bind="plainColorMatProps" />
  </TresMesh>
</template>

<style lang="scss" scoped></style>
