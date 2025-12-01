<script lang="ts" setup>
import AppHeader from "~/components/layout/AppHeader.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
