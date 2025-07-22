<script setup>
import { useCartStore } from '@/stores/cart.js'
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'

const cart = useCartStore()
</script>

<template>
  <div v-if="cart.isEmpty">
    <p class="text-2xl text-center text-gray-900">Cart is empty.</p>
  </div>
  <div v-else>
    <p class="text-4xl font-bold text-gray-900">Your Cart</p>
    <ul role="list"
        class="mt-6 divide-y divide-gray-200"
    >
      <ShoppingCartItem
      v-for="item in cart.items"
      :key="item.id"
      :item="item"
      />

    </ul>
  </div>
</template>

<style scoped></style>
