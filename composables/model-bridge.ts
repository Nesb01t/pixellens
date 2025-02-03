import { useGLTF } from '@tresjs/cientos';
import { CustomBlending, OneFactor, ZeroFactor, type Object3D, type Scene } from 'three';

export type ModelName = string;

export interface MachineObj extends Object3D {
  material?: any;
  geometry?: any;
}

const TRANSPARENT_MATERIALS = ['glass', 'trapdoor'];

export const useModelBridge = () => {
  const getParsedModel = async (modelName: ModelName): Promise<Scene> => {
    const glbResults = await useGLTF(`/models/${modelName}.glb`);
    const glbScene = Array.isArray(glbResults) ? glbResults[0].scene : glbResults.scene;

    /**
     * 通用
     */
    glbScene.traverse((child: any) => {
      const material = (child as any).material;

      if (material) {
        material.depthWrite = true;
        material.depthTest = true;
      }

      child.receiveShadow = true;
      child.castShadow = true;
    });

    /**
     * 透明材质支持
     */
    glbScene.traverse((child: any) => {
      const name: string = child.name;

      // 修复 top 和 around 水体
      if (name.includes('water_still')) {
        const top = child.children[0];
        const around = child.children[1];
        fixTopWater(top);
        fixAroundWater(around);
      }

      // 通用修复
      if (TRANSPARENT_MATERIALS.some((material) => name.includes(material))) {
        fixCommonTransparent(child);
      }
    });

    /**
     * 整体缩放
     */
    glbScene.scale.set(0.4, 0.4, 0.4);
    return glbScene;
  };

  return {
    getParsedModel,
  };
};

const fixAroundWater = (obj: MachineObj) => {
  patchTransparent(obj);

  obj.renderOrder = 3;
  obj.material.opacity = 0.7;
};

const fixTopWater = (obj: MachineObj) => {
  patchTransparent(obj);

  obj.renderOrder = 3;
  obj.material.opacity = 0.7;
};

const fixCommonTransparent = (obj: MachineObj) => {
  patchTransparent(obj);

  obj.material.opacity = 0.95;
};

const patchTransparent = (obj: MachineObj) => {
  const material = obj.material;
  if (!material) {
    return;
  }

  obj.renderOrder = 2;
  material.transparent = true;
  material.depthWrite = false;
  material.depthTest = true;

  material.polygonOffset = true;
  material.polygonOffsetFactor = -1;
  material.polygonOffsetUnits = 1;

  obj.castShadow = false;
};
