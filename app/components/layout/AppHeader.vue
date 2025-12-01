<template>
  <header
    class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 bg-linear-to-br from-gray-900 to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          >
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <span
            class="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Shop
          </span>
        </NuxtLink>

        <nav class="flex items-center gap-8">
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-gray-900 font-medium transition-colors relative group"
          >
            Catalog
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"
            />
          </NuxtLink>

          <NuxtLink to="/cart" class="relative group">
            <div
              class="p-3 rounded-xl bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300"
            >
              <svg
                class="w-6 h-6 text-gray-700 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>

            <Transition
              enter-active-class="transition duration-200"
              enter-from-class="scale-0"
              enter-to-class="scale-100"
            >
              <span
                v-if="cartStore.totalItems"
                class="absolute -top-1 -right-1 bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
              >
                {{ cartStore.totalItems }}
              </span>
            </Transition>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
</script>
