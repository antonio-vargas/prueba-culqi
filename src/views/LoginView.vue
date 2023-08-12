<template>
  <div class="login-view">
    <div class="login__culqi">
      <div class="login__culqi-bg"></div>
      <div class="login__culqi-message">
        <img src="@/assets/images/logo.png" alt="Culqi" />
        <h1>Dale más power ⚡ a tus empleados hoy 💪</h1>
        <p>Te ayudamos a gestionarlos de manera más sencilla</p>
      </div>
    </div>
    <div class="login__form">
      <form class="form" @submit.prevent="handleValid">
        <div class="form__title">
          <h4>Inicia sesión</h4>
        </div>
        <div class="form__body">
          <UiInputField
            v-model="form.correo"
            label="Correo electrónico"
            :is-required="true"
            placeholder="Ingresa el correo electrónico"
            id="fieldEmail"
          />
          <UiInputField
            v-model="form.password"
            label="Contraseña"
            :is-required="true"
            type="password"
            placeholder="Ingresa la contraseña"
            id="fieldPassword"
          />
        </div>
        <div v-if="!!errorForm" class="form__error">
          <span class="material-symbols-outlined">error</span>
          <span>{{ errorForm }}</span>
        </div>
        <div class="form__options">
          <UiButton type="submit">Iniciar sesión</UiButton>
        </div>
        <div class="form__register">
          <p>¿Eres nuevo aquí? <a href="https://culqi.com/" target="_blank">Crea una cuenta</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import UiInputField from '@/components/ui/UiInputField.vue';
  import UiButton from '@/components/ui/UiButton.vue';
  import useAuth from '@/composables/useAuth';

  const form = reactive({ correo: '', password: '' })
  const errorForm = ref('')

  const { errorAuth, submitLogin } = useAuth()

  watch(errorAuth, (newValue) => {
    if (newValue) {
      errorForm.value = newValue
    }
  })

  const handleValid = () => {
    errorForm.value = ''
    if (!form.correo || !form.correo) {
      errorForm.value = 'Todos los campos son obligatorios'
      return
    }

    submitLogin(form)
  }
</script>

<style lang="scss" scoped>
.login-view {
  @apply relative w-full h-screen bg-white flex flex-row;
  .login {
    &__culqi {
      @apply relative h-screen w-1/2 flex flex-col;
      &-bg {
        @apply h-full bg-login bg-cover bg-no-repeat w-full;

      }
      &-message {
        @apply w-full h-[357px] p-[50px];
        @apply bg-slate-950 text-white border-t-[5px] border-primary;
        img {
          @apply mb-6 block;
        }
        h1 {
          @apply w-full text-5xl font-bold tracking-[0.5px] mb-6;
        }
        p {
          @apply text-lg font-normal;
        }
      }
    }
    &__form {
      @apply relative w-1/2 flex items-center justify-center;
      .form {
        @apply w-[480px] mx-auto;
        @apply flex gap-8 flex-col;
        &__title {
          @apply text-2xl font-bold text-gray-900 text-center;
        }
        &__body {
          @apply flex flex-col gap-6;
        }
        &__register {
          @apply w-full text-center;
          p {
            @apply font-medium text-base text-gray-400;
            a {
              @apply text-primary hover:bg-transparent;
            }
          }
        }
        &__error {
          @apply text-red-600 flex flex-row gap-1 items-center justify-start text-sm font-normal;
        }
      }
    }
  }
}
</style>