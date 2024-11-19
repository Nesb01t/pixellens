import * as THREE from 'three';

import testGltf from '@/assets/models/base1.刷线机.glb';

import type { Object3D } from 'three';

export interface MachineObj extends Object3D {
  material?: any;
  geometry?: any;
}

export const useModelBridge = () => {
  const getGltfExample = async () => {
    const glbObject = await useGLTF(testGltf);

    /**
     * generic fix
     */
    glbObject.scene.traverse((child) => {
      const material = (child as any).material;

      // depth fix
      if (material) {
        material.depthWrite = true;
        material.depthTest = true;
      }

      // shadow
      child.receiveShadow = true;
      child.castShadow = true;
    });

    /**
     * waterish material applied
     */
    glbObject.scene.traverse((child) => {
      const name: string = child.name;

      if (name.includes('water_still')) {
        const top = child.children[0];
        const around = child.children[1];

        fixTopWater(top);
        fixAroundWater(around);
      }
    });

    /**
     * global scaling
     */
    glbObject.scene.scale.set(0.4, 0.4, 0.4);
    return glbObject.scene;
  };

  return {
    getGltfExample,
  };
};

const fixAroundWater = (obj: MachineObj) => {
  const material = obj.material;
  if (!material) {
    return;
  }

  obj.renderOrder = 1;
  material.transparent = true;
  material.depthWrite = false;
  material.depthTest = true;

  material.polygonOffset = true;
  material.polygonOffsetFactor = -1;
  material.polygonOffsetUnits = 1;

  material.opacity = 0.75;

  obj.castShadow = false;
  obj.receiveShadow = true;
};

const fixTopWater = (obj: MachineObj) => {
  const material = obj.material;
  if (!material) {
    return;
  }

  obj.renderOrder = 1;
  material.transparent = true;
  material.depthWrite = false;
  material.depthTest = true;

  material.polygonOffset = true;
  material.polygonOffsetFactor = -1;
  material.polygonOffsetUnits = 1;

  material.opacity = 0.75;

  obj.castShadow = false;
  obj.receiveShadow = true;
};
