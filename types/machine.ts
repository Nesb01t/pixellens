import type { DownloadableStatus } from '~/components/utils-panel/index.vue';

export interface IMachine {
  name: string;
  category: MachineCategory;

  segCategory?: string;
  descriptions?: string[];
  materials?: IMaterialSet[];

  private?: {
    id?: string;
    fileName: string;
  };
  downloadable?: DownloadableStatus;
}

export interface IMaterialSet {
  // id: string;
  name: string;
  amount: number;
}

export enum MachineCategory {
  BASIC = '基础',
  FARM = '农业',
  PASTURE = '牧业',
  ROCK = '石材',
  WOOD = '木材',
}
