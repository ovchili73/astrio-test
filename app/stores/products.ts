// stores/products.ts

import type { Brand, Product } from "~/types";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const brands = ref<Brand[]>([]);
  const selectedBrands = ref<number[]>([]);
  const loading = ref(false);

  const filteredProducts = computed(() => {
    if (selectedBrands.value.length === 0) return products.value;
    return products.value.filter((p) => selectedBrands.value.includes(p.brand));
  });

  const getBrandName = (brandId: number): string => {
    return brands.value.find((b) => b.id === brandId)?.title || "Unknown";
  };

  const loadData = async () => {
    try {
      loading.value = true;

      const [productsData, brandsData] = await Promise.all([
        $fetch<Product[]>("/data/products.json"),
        $fetch<Brand[]>("/data/brands.json"),
      ]);

      products.value = productsData;
      brands.value = brandsData;
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      loading.value = false;
    }
  };

  const toggleBrand = (brandId: number) => {
    const index = selectedBrands.value.indexOf(brandId);
    if (index > -1) {
      selectedBrands.value.splice(index, 1);
    } else {
      selectedBrands.value.push(brandId);
    }
  };

  return {
    products,
    brands,
    selectedBrands,
    filteredProducts,
    loading,
    loadData,
    toggleBrand,
    getBrandName,
  };
});
