import type { Vector2 } from 'three';
import { Raycaster } from 'three';
import { useCanvasSize } from './canvas-size';

export const useRaycaster = () => {
  const raycaster = new Raycaster();
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
    console.log(intersectObjs[0]);
  };

  return {
    setupRaycaster,
  };
};
