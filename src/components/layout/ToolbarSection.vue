<template>
  <nav class="toolbar-section">
    <div class="toolbar__user">
      <div class="user">
        <div class="user__avatar">{{ avatar }}</div>
        <div class="user__name">{{  authStore.user?.nombre || ''  }}</div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth.store';
  import { computed } from 'vue';

  const authStore = useAuthStore();

  const avatar = computed(() => {
    const words = (authStore.user?.nombre || '').trim().split(' ');

    let initials = '';
    words.forEach((word) => initials += `${word[0]} `)

    return initials.trim();
  })
</script>

<style lang="scss" scoped>
.toolbar-section {
  @apply bg-white flex flex-row px-8 py-6 relative w-full border-b border-gray-300 justify-end;
  .toolbar {
    &__user {
      @apply h-8 flex justify-center items-center;
    }
  }
  .user {
    @apply flex flex-row gap-2 items-center;
    &__avatar {
      @apply h-8 w-8 text-white text-sm font-bold bg-orange-600 rounded-full inline-flex justify-center items-center;
    }
    &__name {
      @apply text-slate-950 text-xs font-bold;
    }
  }
}
</style>