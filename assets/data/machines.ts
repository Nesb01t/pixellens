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
