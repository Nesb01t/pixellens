import type { Object3D, Scene } from 'three';

export type ModelName = string;

export interface MachineObj extends Object3D {
  material?: any;
  geometry?: any;
}

export const useModelBridge = () => {
  const getParsedModel = async (modelName: ModelName): Promise<Scene> => {
    const glbResults = await useGLTF(`/models/${modelName}.glb`);
    const glbScene = Array.isArray(glbResults) ? glbResults[0].scene : glbResults.scene;

    /**
     * generic fix
     */
    glbScene.traverse((child: any) => {
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
    glbScene.traverse((child: any) => {
      const name: string = child.name;

      if (name.includes('water_still')) {
        const top = child.children[0];
        const around = child.children[1];

        fixTopWater(top);
        fixAroundWater(around);
      }

      if (name.includes('glass')) {
        fixGlass(child);
      }
    });

    /**
     * global scaling
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

  obj.material.opacity = 0.65;
};

const fixTopWater = (obj: MachineObj) => {
  patchTransparent(obj);

  obj.material.opacity = 0.85;
};

const fixGlass = (obj: MachineObj) => {
  patchTransparent(obj);

  obj.material.opacity = 0.8;
};

const patchTransparent = (obj: MachineObj) => {
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

  obj.castShadow = false;
  obj.receiveShadow = true;
};
