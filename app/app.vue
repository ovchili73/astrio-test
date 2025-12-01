<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <Toast ref="toast" />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Toast from "~/components/common/Toast.vue";
const toast = ref();

onMounted(() => {
  window.addEventListener("show-toast", (e: any) => {
    toast.value?.show(e.detail);
  });
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
}
</style>
