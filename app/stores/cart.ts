// stores/cart.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product, CartItem } from "~/types";

export const useCartStore = defineStore("cart", () => {
  const { showToast } = useToast();
  const items = ref<CartItem[]>([]);

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.product.regular_price.value * item.quantity,
      0
    )
  );

  const addToCart = (
    product: Product,
    selectedOptions?: Record<string, number>,
    variantImage?: string
  ) => {
    const existingIndex = items.value.findIndex((item) => {
      if (item.product.id !== product.id) return false;
      if (!selectedOptions) return !item.selectedOptions;
      return (
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );
    });

    if (existingIndex > -1) {
      items.value[existingIndex]!.quantity++;
    } else {
      items.value.push({
        product,
        quantity: 1,
        selectedOptions,
        variantImage,
      });
    }

    showToast("Added to cart");
  };

  const removeFromCart = (index: number) => {
    items.value.splice(index, 1);

    showToast("Removed from cart");
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) removeFromCart(index);
    else items.value[index]!.quantity = quantity;
  };

  const clearCart = () => {
    items.value = [];
    showToast("Cart is cleared");
  };

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
