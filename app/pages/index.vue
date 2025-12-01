<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8">
    <div class="container mx-auto px-4">
      <!-- Заголовок -->
      <div class="mb-8">
        <h1
          class="text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
        >
          Product Catalog
        </h1>
        <p class="text-gray-600">
          {{ productsStore.filteredProducts.length }} products available
        </p>
      </div>

      <!-- Мобильный фильтр -->
      <div class="lg:hidden mb-6">
        <button
          class="w-full bg-white rounded-xl shadow-md p-4 flex items-center justify-between"
          @click="mobileFilterOpen = !mobileFilterOpen"
        >
          <span class="font-semibold text-gray-900">Filters</span>
          <svg
            class="w-5 h-5 transition-transform"
            :class="{ 'rotate-180': mobileFilterOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="mobileFilterOpen" class="mt-4">
            <BrandFilter />
          </div>
        </Transition>
      </div>

      <!-- Основная сетка -->
      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <!-- Фильтр десктоп -->
        <div class="hidden lg:block">
          <BrandFilter />
        </div>

        <!-- Товары -->
        <div>
          <ProductGrid
            :products="productsStore.filteredProducts"
            :loading="productsStore.loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/products";
import ProductGrid from "~/components/product/ProductGrid.vue";
import BrandFilter from "~/components/product/BrandFilter.vue";

const productsStore = useProductsStore();
const mobileFilterOpen = ref(false);

onMounted(() => {
  productsStore.loadData();
});

useHead({
  title: "Product Catalog",
  meta: [
    { name: "description", content: "Browse our product catalog with filters" },
  ],
});
</script>
