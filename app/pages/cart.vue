<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Заголовок -->
      <div class="mb-8">
        <h1
          class="text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
        >
          Shopping Cart
        </h1>
        <p class="text-gray-600">
          {{ cartStore.totalItems }} items in your cart
        </p>
      </div>

      <!-- Пустая корзина -->
      <div
        v-if="cartStore.items.length === 0"
        class="bg-white rounded-3xl shadow-xl p-16 text-center"
      >
        <div
          class="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-16 h-16 text-gray-400"
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
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p class="text-gray-600 mb-6">
          Looks like you haven't added anything yet
        </p>
        <NuxtLink
          to="/"
          class="inline-block px-8 py-4 bg-linear-to-r from-gray-900 to-gray-700 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold"
        >
          Start Shopping
        </NuxtLink>
      </div>

      <!-- Корзина с товарами -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Список товаров -->
        <div class="lg:col-span-2 space-y-4">
          <TransitionGroup
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0 -translate-x-full"
          >
            <CartItem
              v-for="(item, index) in cartStore.items"
              :key="item.product.id"
              :item="item"
              :index="index"
              @remove="handleRemove(index)"
            />
          </TransitionGroup>
        </div>

        <!-- Сводка заказа -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span class="font-semibold"
                  >${{ cartStore.totalPrice.toFixed(2) }}</span
                >
              </div>

              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span class="font-semibold text-green-600">Free</span>
              </div>

              <div
                class="border-t pt-4 flex justify-between text-lg font-bold text-gray-900"
              >
                <span>Total</span>
                <span
                  class="text-2xl bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                >
                  ${{ cartStore.totalPrice.toFixed(2) }}
                </span>
              </div>
            </div>

            <button
              class="w-full py-4 px-6 bg-linear-to-r from-gray-900 to-gray-700 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mb-4"
            >
              Proceed to Checkout
            </button>

            <NuxtLink
              to="/"
              class="block text-center text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              ← Continue Shopping
            </NuxtLink>

            <!-- Trust badges -->
            <div class="mt-6 pt-6 border-t space-y-3">
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <svg
                  class="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Secure checkout
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <svg
                  class="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Free shipping on all orders
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItem from "~/components/cart/CartItem.vue";
const cartStore = useCartStore();

const handleRemove = (index: number) => {
  if (confirm("Remove item from cart?")) {
    cartStore.removeFromCart(index);
  }
};

useHead({
  title: "Shopping Cart",
  meta: [{ name: "description", content: "Your shopping cart" }],
});
</script>
