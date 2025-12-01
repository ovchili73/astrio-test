<template>
  <aside class="bg-white rounded-2xl shadow-lg p-6 sticky top-24 h-fit">
    <h3 class="text-lg font-bold text-gray-900 mb-4 pb-4 border-b">Brands</h3>

    <div class="space-y-2 max-h-[600px] overflow-y-auto pr-2">
      <label
        v-for="brand in brands"
        :key="brand.id"
        class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2.5 rounded-lg transition-all duration-200 group"
      >
        <input
          type="checkbox"
          :value="brand.id"
          :checked="productsStore.selectedBrands.includes(brand.id)"
          @change="productsStore.toggleBrand(brand.id)"
          class="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus:ring-2 transition-all"
        />
        <span
          class="text-gray-700 text-sm group-hover:text-gray-900 transition-colors"
        >
          {{ brand.title }}
        </span>
      </label>
    </div>

    <button
      v-if="productsStore.selectedBrands.length > 0"
      @click="productsStore.selectedBrands = []"
      class="mt-6 w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
    >
      Clear all filters
    </button>
  </aside>
</template>

<script setup lang="ts">
const productsStore = useProductsStore();
const { brands } = storeToRefs(productsStore);
</script>
