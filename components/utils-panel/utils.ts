export const downloadGlb = (filename: string) => {
  const link = document.createElement('a');
  link.href = `/materials/${filename}.glb`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadTxt = (filename: string) => {
  const link = document.createElement('a');
  link.href = `/materials/${filename}.txt`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadLitematic = (filename: string) => {
  const link = document.createElement('a');
  link.href = `/materials/${filename}.litematic`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
