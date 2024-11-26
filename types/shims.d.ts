/// <reference types="vite/client" />

declare module '*.fbx' {
  const src: string;
  export default src;
}

declare module '*.glb' {
  const src: string;
  const buffer: Buffer;
  export default buffer;
}
