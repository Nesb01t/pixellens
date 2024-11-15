import testGltf from '@/assets/models/village-breeder.glb';

export const useModelBridge = () => {
  const getGltfExample = async () => {
    const glbObject = await useGLTF(testGltf);
    glbObject.scene.traverse((child) => {
      if (child.name == 'glass') {
        const material = (child as any).material;
        material.transparent = true;
        material.opacity = 0.75;
      }

      if (child.name == 'potatoes_stage3') {
        child.renderOrder = -1;

        const material = (child as any).material;
        material.transparent = true;
        material.opacity = 0.75;
      }
      // child.receiveShadow = true;
      // child.castShadow = true;
    });
    return glbObject.scene;
  };

  return {
    getGltfExample,
  };
};
