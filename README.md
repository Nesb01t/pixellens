# MachineHub 生电工房

Tresjs 3D 我的世界生电指南

3d wiki for minecraft survival machine.

## Features

### Basically Resolved

- Blender / Mineways / MachineHub 有效率的模型工作流
- 材料手动英译中工具
- 解析材质包自动进行纹理贴图
- 通用的导入时材质补丁, 归一化纹理属性
- 相机基础可交互
- 同场景内动态增减物体
- 物体进入和离开场景时动画
- skybox 和氛围环境光
- 实时的场景切换
- 针对特殊物体 (玻璃 / 水等) 进行透明剔除和阴影特殊设置工具链

### Magic Features

暂时或不必要进行流程化 / 自动化的, 需要人工控制的部分

- Machine 增加新机器
  - 在 assets/data/machines.ts 中添加新机器描述

- Block 列表英译中 & 投影映射
  - 当加载到未翻译的 Block 时会向控制台输出需要翻译的信息, 导入 LLM 进行翻译
  - 需要在 utils/translate-mapping 中修复不恰当的翻译
  - 并在 assets/materials 中置入原始 Litematic mod 导出的材料 .txt

- Blender / Mineways / MachineHub 模型工作流
  - 首先在 mc 里完成建筑并提取获得 **(1. Litematic)**
  - 然后在 Mineways 里导出建筑到 obj
  - 在 Blender 中材质化 obj 并导出 gltf **(2. gltf)**
  - 把上述内容分别置入 assets/litematic 和 assets/models
### Todo

- 更友好美观的 UI/UX 体验
- 基于 Shader 的顶点偏移动画
- Enviorment 切换过渡动画
- 支持对模型 / 材料列表进行 crud 的后端
- 机器内部不可视的交互问题
  - 像投影一样根据层级透视
  - 或根据材质交互透视
