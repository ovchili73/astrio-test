<template>
  <div>
    <!-- Loading state -->
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-2xl shadow-sm p-4 animate-pulse"
      >
        <div class="aspect-square bg-gray-200 rounded-xl mb-4" />
        <div class="h-3 bg-gray-200 rounded w-1/4 mb-3" />
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div class="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="products.length === 0" class="text-center py-16">
      <div
        class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
      >
        <svg
          class="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <p class="text-xl text-gray-600 font-medium">No products found</p>
      <p class="text-gray-500 mt-2">Try adjusting your filters</p>
    </div>

    <!-- Products grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types";
import ProductCard from "./ProductCard.vue";

defineProps<{
  products: Product[];
  loading?: boolean;
}>();
</script>
