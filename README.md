# MachineHub 生电工房

3d wiki for minecraft survival machine.

## 功能

1. 与时俱进的科技树, 进度同步 (基于浏览器缓存)
2. 3D 可视化机器结构, 可导出 Litematica / obj 文件

## Todo

- [ ] 可交互的结构层级, 例如隐藏 / 只显示某 y 层方块
- [ ] Seek 某个类型的方块 + Bloom [tresjs useseek](https://docs.tresjs.org/zh/api/composables.html#useseek)

## 结构文件转换

目前用 mineways 来将 schematic 转换到可用的模型结构 (gltf)

1. litematic 通过投影 mod 可以转换成 .nbt / 目前不知为何无法导出 schematic!

2. schem (1.13+ WorldEdit 格式) 直接提供转换能力，转换到 schematic

> schem -> 通过后端 -> schematic

3. schematic (before 1.12) 可以直接使用
