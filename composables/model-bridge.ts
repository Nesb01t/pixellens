import vineFbx from '@/assets/models/vine.fbx';
import testGltf from '@/assets/models/test.glb';
import { useFBX } from '@tresjs/cientos';

export const useModelBridge = () => {
  const getFbxExample = async () => {
    const fbxObject = await useFBX(vineFbx);
    return fbxObject;
  };

  const getGltfExample = async () => {
    const glbObject = await useGLTF(testGltf);
    glbObject.scene.traverse((child) => {
      console.log(child);
      child.receiveShadow = true;
      child.castShadow = true;
    });
    return glbObject.scene;
  };

  return {
    getFbxExample,
    getGltfExample,
  };
};
