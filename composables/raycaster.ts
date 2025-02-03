import type { Object3D, Object3DEventMap, Vector2 } from 'three';
import { Raycaster } from 'three';
import { useCanvasSize } from './canvas-size';
import { useGameTipStore } from '#build/imports';

export interface RaycastSideEffect {
  type: RaycastSideEffectType;
  data: any;
}

export enum RaycastSideEffectType {
  TIPS = 'TIPS',
}

export const useRaycaster = () => {
  const raycaster = new Raycaster();
  const gametipStore = useGameTipStore();
  const { getMouseViewportVector } = useCanvasSize();

  const setupRaycaster = (scene: any, camera: any) => {
    raycaster.setFromCamera(getMouseViewportVector() as Vector2, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    const intersectObjs = [];
    for (let i = 0; i < intersects.length; i++) {
      const obj: any = intersects[i].object;
      if (obj.type === 'Mesh') {
        intersectObjs.push(obj);
      }
    }
    useRaycastObjectsEffect(intersectObjs);
  };

  const useRaycastObjectsEffect = (objs: Object3D<Object3DEventMap>[]) => {
    const sideEffects: RaycastSideEffect[] = [];
    objs.forEach((obj) => {
      const pass = objectPass(obj);
      if (pass) {
        sideEffects.push(pass);
      }
    });

    let gametipContent;
    sideEffects.forEach((sideEffect) => {
      if (sideEffect.type === RaycastSideEffectType.TIPS) {
        gametipContent = sideEffect.data.content ?? sideEffect.data;
      }
    });

    gametipStore.setRaycastContent(gametipContent);
  };

  const objectPass = (obj: Object3D<Object3DEventMap>): RaycastSideEffect | undefined => {
    if (obj.name === 'Tips') {
      return { type: RaycastSideEffectType.TIPS, data: obj.userData };
    }
  };

  return {
    setupRaycaster,
  };
};
