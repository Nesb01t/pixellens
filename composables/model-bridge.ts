import vineFbx from '@/assets/models/vine.fbx';
import { useFBX } from '@tresjs/cientos';

export const useModelBridge = () => {
  const getFbxExample = async () => {
    const fbxObject = await useFBX(vineFbx);
    return fbxObject;
  };

  return {
    getFbxExample,
  };
};
