<template>
  <div
    class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
  >
    <div class="flex gap-6">
      <!-- Изображение -->
      <div
        class="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform duration-300"
      >
        <img
          :src="item.variantImage || item.product.image"
          :alt="item.product.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Информация -->
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start mb-2">
          <div>
            <p class="text-xs text-gray-500 mb-1">{{ brandName }}</p>
            <h3 class="font-bold text-gray-900 text-lg">
              {{ item.product.title }}
            </h3>
          </div>

          <!-- Кнопка удаления -->
          <button
            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Remove from cart"
            @click="emit('remove')"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <!-- Опции -->
        <div v-if="item.selectedOptions" class="flex gap-2 mb-3">
          <span
            v-for="(label, key) in optionLabels"
            :key="key"
            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200"
          >
            {{ key }}: <strong class="ml-1">{{ label }}</strong>
          </span>
        </div>

        <div
          class="flex flex-col items-between justify-between mt-4 md:flex-row"
        >
          <div class="flex items-center gap-4">
            <div class="flex items-center bg-gray-100 rounded-lg">
              <button
                class="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                @click="decreaseQuantity"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span
                class="px-4 py-2 font-semibold text-gray-900 min-w-12 text-center"
              >
                {{ quantity }}
              </span>
              <button
                class="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                @click="increaseQuantity"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            <div class="text-sm text-gray-500">
              ${{ item.product.regular_price.value.toFixed(2) }} each
            </div>
          </div>

          <!-- Итого -->
          <div class="text-right">
            <p
              class="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              ${{
                (item.product.regular_price.value * item.quantity).toFixed(2)
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from "~/types";

const props = defineProps<{
  item: CartItem;
  index: number;
}>();

const emit = defineEmits(["remove"]);
const cartStore = useCartStore();
const productsStore = useProductsStore();

const quantity = ref(props.item.quantity);

const brandName = computed(() => {
  return productsStore.getBrandName(props.item.product.brand);
});

const optionLabels = computed(() => {
  if (!props.item.selectedOptions || !props.item.product.configurable_options) {
    return {};
  }

  const labels: Record<string, string> = {};

  for (const [code, valueIndex] of Object.entries(props.item.selectedOptions)) {
    const option = props.item.product.configurable_options.find(
      (o) => o.attribute_code === code
    );
    if (option) {
      const value = option.values.find((v) => v.value_index === valueIndex);
      if (value) {
        labels[option.label] = value.label;
      }
    }
  }

  return labels;
});

const increaseQuantity = () => {
  quantity.value++;
  cartStore.updateQuantity(props.index, quantity.value);
};

const decreaseQuantity = () => {
  quantity.value--;
  cartStore.updateQuantity(props.index, quantity.value);
};
</script>
