<script setup lang="ts">
import AchievementCard from './achievement-card.vue';
import { machines } from 'assets/data/machines';
import { type IMachine, MachineCategory } from '~/types/machine';

const groupMachinesByCategory = (machines: IMachine[]): Record<MachineCategory, IMachine[]> => {
  return machines.reduce(
    (acc, machine) => {
      if (!acc[machine.category]) {
        acc[machine.category] = [];
      }
      acc[machine.category].push(machine);
      return acc;
    },
    {} as Record<MachineCategory, IMachine[]>,
  );
};

const categoryValues: MachineCategory[] = Object.values(MachineCategory) as MachineCategory[];

const machinesByCategory = groupMachinesByCategory(machines);
</script>

<template>
  <div class="w-full h-full flex flex-col gap-1">
    <div v-for="(category, idx) in categoryValues" :key="idx" class="pb-3 flex-col flex gap-1">
      <template v-if="machinesByCategory[category]">
        <h3
          class="text-[15px] border-l-[5px] mb-3 border-orange-400/15 ml-[1px] pl-[6px] flex items-center gap-1 text-orange-300/65"
        >
          <Icon name="pixelarticons:book" class="text-lg" />
          {{ category }}
        </h3>
        <AchievementCard v-for="(m, i) in machinesByCategory[category]" :key="i" :machine="m" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
