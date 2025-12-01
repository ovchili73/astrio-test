import { defineNuxtPlugin } from "#app";
import { useCartStore } from "~/stores/cart";

export default defineNuxtPlugin(() => {
  try {
    const store = useCartStore();

    const raw = localStorage.getItem("cart");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          store.$patch({ items: parsed });
        }
      } catch (e) {
        console.warn("Invalid cart in localStorage, ignoring:", e);
      }
    }

    store.$subscribe(
      (mutation, state) => {
        try {
          localStorage.setItem("cart", JSON.stringify(state.items));
        } catch (e) {
          console.warn("Failed to save cart to localStorage:", e);
        }
      },
      { detached: true }
    );
  } catch (e) {
    console.warn("Cart plugin error:", e);
  }
});
