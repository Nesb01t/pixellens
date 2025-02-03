import { type IMachine, MachineCategory } from '~/types/machine';

export const machines: IMachine[] = [
  {
    name: '刷线机',
    category: MachineCategory.BASIC,
    descriptions: ['狠狠地刷线获得大量的绿宝石', '无限的线还能进行无限量羊毛供应'],
    private: {
      fileName: 'base1.刷线机',
    },
    downloadable: {
      txt: true,
      glb: true,
    },
    tips: [
      {
        content:
          '前期必备刷线机, 攒到 3 个铁制作绊线钩和 ✂ 还有 2 根线就可以开刷了 (线可以打蜘蛛 / 用剑砍蜘蛛网掉, 点击材料列表查看所有材料获取来源)',
        position: { x: 1, y: 0.3, z: 0 },
      },
      {
        content:
          '0. 仅限 Java 版<br>1. F3 + G 确认整个机器在一个区块内<br>2. 机器朝南 (即做机器时人朝西)<br>3. 下面 2 层都没有实际作用可忽略<br>4. 注意活板门方向<br>5. 用剪刀左键剪靠近拉杆的那根线, 随后拉下两次拉杆就可以正常工作了',
        position: { x: 0.25, y: 1.3, z: 0 },
      },
    ],
  },
  {
    name: '养牛机',
    category: MachineCategory.BASIC,
    descriptions: ['可以在前期获得大量皮革和牛肉'],
    private: {
      fileName: 'base2.养牛机',
    },
    downloadable: {
      glb: true,
    },
  },
];
