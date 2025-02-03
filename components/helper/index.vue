<script setup lang="ts"></script>

<template>
  <div class="absolute right-3 top-3 gap-2 flex flex-col">
    <HelperGroup title="显示操作按键">
      <ul class="helper-list">
        <li>
          <Icon name="pixelarticons:zoom-in" />
          <span>缩放：滚轮上下 or 按住中键拖动</span>
        </li>

        <li>
          <Icon name="pixelarticons:move" />
          <span>移动：按住右键拖动</span>
        </li>

        <li>
          <Icon name="pixelarticons:reload" />
          <span>旋转：按住左键拖动</span>
        </li>
      </ul>
    </HelperGroup>

    <HelperGroup title="调试信息">
      <ul class="helper-list">
        <li>
          <Icon name="pixelarticons:next" />
          <span>1. mc 里完成建筑并提取 (1)[litematic]</span>
        </li>

        <li>
          <Icon name="pixelarticons:remove-box-multiple" />
          <span>2. mineways 导出建筑到 obj</span>
        </li>

        <li>
          <Icon name="pixelarticons:paperclip" />
          <span>3. blender 执行 remesh 并导出 (2)[gltf]</span>
        </li>
      </ul>
    </HelperGroup>
  </div>
</template>

<style lang="scss" scoped>
ul.helper-list {
  @apply flex flex-col gap-1;

  li {
    @apply flex items-center gap-[9px] pl-[3px];
  }
}
</style>
