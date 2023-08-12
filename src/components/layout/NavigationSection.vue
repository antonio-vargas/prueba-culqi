<template>
  <nav class="navigation-section">
    <div class="navigation__logo">
      <img src="@/assets/images/logo-panel.svg" alt="Culqi" />
    </div>
    <div class="navigation__menu">
      <div class="navigation__menu-nav">
        <router-link to="/panel/empleados" exact>
          <span class="material-symbols-outlined">group</span>Empleados
        </router-link>
        <router-link to="/panel/reclutamiento" exact>
          <span class="material-symbols-outlined">work</span>Reclutamiento
        </router-link>
      </div>
      <div class="navigation__menu-logout">
        <UiButton class="btn-logout" type="button" @click="handleLogout">Salir</UiButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import UiButton from '@/components/ui/UiButton.vue';
  import { useAuthStore } from '@/stores/auth.store';
  import router from '@/router';


  const authStore = useAuthStore();

  const handleLogout = () => {
    authStore.logout();
    router.replace({ path: '/' })
  }
</script>

<style lang="scss" scoped>
.navigation-section {
  @apply bg-white h-screen flex flex-col px-8 py-6 absolute w-[280px] left-0 top-0 border-r border-gray-300;
  .navigation {
    &__logo {
      @apply h-24 flex justify-center items-center;
    }
    &__menu {
      @apply h-full flex flex-col justify-between;
      &-nav {
        a{
          @apply py-4 font-bold text-sm flex gap-2 items-center justify-start text-gray-950 bg-transparent;
          img{
            @apply text-gray-950;
            path {
              @apply text-gray-950;
            }
          }
          &.router-link-exact-active{
            @apply text-primary;
            img{
              @apply text-primary;
              path {
                @apply text-primary;
              }
            }
          }
        }
      }
      &-logout {
        @apply w-full;
        .btn-logout{
          @apply bg-transparent border border-gray-950 text-gray-950 font-bold text-sm tracking-[0.2px] rounded-[10px];
        }
      }
    }
  }
}
</style>