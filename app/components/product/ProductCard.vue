<template>
  <article
    class="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
  >
    <!-- Изображение -->
    <div
      class="relative aspect-square overflow-hidden bg-linear-to-br from-gray-50 to-gray-100"
    >
      <img
        :src="currentImage"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      <!-- Badge для configurable -->
      <div
        v-if="product.type === 'configurable'"
        class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700"
      >
        Customizable
      </div>
    </div>

    <div class="p-5">
      <!-- Brand -->
      <span
        class="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-2"
      >
        {{ brandName }}
      </span>

      <h3
        class="text-base font-semibold text-gray-900 mb-1 line-clamp-2 min-h-12"
      >
        {{ product.title }}
      </h3>

      <!-- Цена -->
      <div class="flex items-baseline gap-2 mb-4">
        <p
          class="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        >
          ${{ product.regular_price.value.toFixed(2) }}
        </p>
      </div>

      <!-- Опции -->
      <div v-if="product.type === 'configurable'" class="space-y-3 mb-4">
        <!-- Цвета -->
        <div v-if="colorOptions.length" class="space-y-2">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Color
          </p>
          <div class="flex gap-2">
            <button
              v-for="value in colorOptions"
              :key="value.value_index"
              :disabled="!isOptionAvailable('color', value.value_index)"
              :class="[
                'w-10 h-10 rounded-full relative transition-all duration-200',
                selectedOptions['color'] === value.value_index
                  ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                  : 'hover:scale-105',
                !isOptionAvailable('color', value.value_index) &&
                  'opacity-30 cursor-not-allowed',
              ]"
              :style="{ background: getColorGradient(String(value.value)) }"
              @click="selectOption('color', value.value_index)"
            >
              <svg
                v-if="selectedOptions['color'] === value.value_index"
                class="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Размеры -->
        <div v-if="sizeOptions.length" class="space-y-2">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Size
          </p>
          <div class="flex gap-2">
            <button
              v-for="value in sizeOptions"
              :key="value.value_index"
              :disabled="!isOptionAvailable('size', value.value_index)"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                selectedOptions['size'] === value.value_index
                  ? 'bg-gray-900 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                !isOptionAvailable('size', value.value_index) &&
                  'opacity-30 line-through cursor-not-allowed',
              ]"
              @click="selectOption('size', value.value_index)"
            >
              {{ value.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Кнопка -->
      <button
        :disabled="!canAddToCart"
        class="w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group/btn disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-linear-to-r from-gray-900 to-gray-700 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-white/20 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
        @click="handleAddToCart"
      >
        <span class="relative z-10 flex items-center justify-center gap-2">
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {{ addButtonText }}
        </span>
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from "~/types";

const props = defineProps<{ product: Product }>();
const cartStore = useCartStore();
const productsStore = useProductsStore();

const selectedOptions = ref<Record<string, number>>({});
const currentImage = ref(props.product.image);
const currentId = ref(props.product.id);

const brandName = computed(() =>
  productsStore.getBrandName(props.product.brand)
);

const colorOptions = computed(
  () =>
    props.product.configurable_options?.find(
      (o) => o.attribute_code === "color"
    )?.values || []
);

const sizeOptions = computed(
  () =>
    props.product.configurable_options?.find((o) => o.attribute_code === "size")
      ?.values || []
);

const getColorGradient = (color: string): string => {
  return `linear-gradient(135deg, ${color} 0%, ${adjustBrightness(
    color,
    -20
  )} 100%)`;
};

const adjustBrightness = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
};

const isOptionAvailable = (
  attributeCode: string,
  valueIndex: number
): boolean => {
  const otherSelections = Object.entries(selectedOptions.value).filter(
    ([code]) => code !== attributeCode
  );

  if (otherSelections.length === 0) return true;

  return (
    props.product.variants?.some(
      (variant) =>
        variant.attributes.some(
          (attr) =>
            attr.code === attributeCode && attr.value_index === valueIndex
        ) &&
        otherSelections.every(([code, value]) =>
          variant.attributes.some(
            (attr) => attr.code === code && attr.value_index === value
          )
        )
    ) ?? false
  );
};

const canAddToCart = computed(() => {
  if (props.product.type === "simple") return true;

  if (!props.product.configurable_options) return false;

  const allOptionsSelected = props.product.configurable_options.every(
    (option) => selectedOptions.value[option.attribute_code] !== undefined
  );

  if (!allOptionsSelected) return false;

  return (
    props.product.variants?.some((variant) =>
      variant.attributes.every(
        (attr) => selectedOptions.value[attr.code] === attr.value_index
      )
    ) ?? false
  );
});

const addButtonText = computed(() => {
  if (props.product.type === "simple") return "Add to Cart";
  if (!canAddToCart.value) {
    const hasSelections = Object.keys(selectedOptions.value).length > 0;
    if (hasSelections) return "Combination Unavailable";
    return "Select Options";
  }
  return "Add to Cart";
});

const selectOption = (code: string, value: number) => {
  selectedOptions.value[code] = value;
  updateImage();
  updateId();
};

const updateImage = () => {
  const allSelected = props.product.configurable_options?.every(
    (option) => selectedOptions.value[option.attribute_code] !== undefined
  );

  if (!allSelected) {
    currentImage.value = props.product.image;
    return;
  }

  const variant = props.product.variants?.find((v) =>
    v.attributes.every(
      (attr) => selectedOptions.value[attr.code] === attr.value_index
    )
  );

  currentImage.value = variant?.product.image || props.product.image;
};

const updateId = () => {
  const allSelected = props.product.configurable_options?.every(
    (option) => selectedOptions.value[option.attribute_code] !== undefined
  );

  if (!allSelected) {
    currentId.value = props.product.id;
    return;
  }

  const variant = props.product.variants?.find((v) =>
    v.attributes.every(
      (attr) => selectedOptions.value[attr.code] === attr.value_index
    )
  );

  currentId.value = variant?.product.id || props.product.id;
};

const handleAddToCart = () => {
  cartStore.addToCart(
    {
      ...props.product,
      id: currentId.value,
    },
    props.product.type === "configurable"
      ? { ...selectedOptions.value }
      : undefined,
    currentImage.value
  );
};
</script>
