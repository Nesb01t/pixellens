export const parseTableData = (input: string) => {
  const lines = input.trim().split('\n');
  const records = [];

  for (let i = 5; i < lines.length - 3; i++) {
    const columns = lines[i]
      .split('|')
      .map((col) => col.trim())
      .filter((col) => col);
    const item = columns[0];
    const total = parseInt(columns[1], 10);
    records.push({ item, total });
  }
  return records;
};

export const loadMaterialMap = async (keys: string[], modelName: string) => {
  const materialRawContent = await loadTextFile(modelName);
  if (!materialRawContent) {
    console.log(`[mh] 未找到 material 文件`);
    return;
  }

  const materialMap: Record<string, number> = {};
  const materialRawContents = parseTableData(materialRawContent);
  materialRawContents.forEach((item) => {
    materialMap[item.item] = item.total;
  });
  if (Object.keys(materialMap).length < 1) {
    console.log(`[mh] 未找到 material 文件`);
    return undefined;
  }
  return materialMap;
};

async function loadTextFile(modelName: string) {
  try {
    const response = await fetch(`/materials/${modelName}.txt`);
    if (!response.ok) {
      return undefined;
    }

    const rawText = await response.text();
    if (rawText[0] === '<') {
      return undefined;
    }

    return rawText;
  } catch (error) {
    console.error('Error loading text file:', error);
  }
}
