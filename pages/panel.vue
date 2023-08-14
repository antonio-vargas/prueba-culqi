<template>
  <div class="panel-layout">
    <NavigationSection />
    <main class="panel-layout__main">
      <ToolbarSection />
      <div class="panel-layout__wrapper">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import NavigationSection from '@/components/layout/NavigationSection.vue';
  import ToolbarSection from '@/components/layout/ToolbarSection.vue';
</script>

<style lang="scss" scoped>
.panel-layout{
  @apply bg-gray-100 pl-[280px];
  &__main {
    @apply bg-gray-100 relative h-screen w-full;
  }
  &__wrapper{
    @apply block w-full overflow-y-auto px-4 py-8;
    height: calc(100% - 82px);
  }
}
</style>