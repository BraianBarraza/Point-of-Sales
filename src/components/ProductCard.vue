<script setup>
import { formatCurrency } from '../helpers/index.js'
import { useCartStore } from '@/stores/cart.js'

const cart = useCartStore()

defineProps({
  product: {
    type: Object,
  },
})
</script>

<template>
  <div class="rounded bg-white shadow relative">
    <img :src="product.image" :alt="'image from' + product.name" />

    <div class="p-3 space-y-2">
      <h3 class="text-xl font-black text-gray-500">
        {{ product.name }}
      </h3>

      <p class="text-gray-500">availability: {{ product.availability }}</p>

      <p class="text-gray-900 font-extrabold text-xl xl:text-2xl">
        {{ formatCurrency(product.price) }}
      </p>
    </div>
    <button type="button"
            class="absolute top-5 -right-4"
            @click="cart.addItem(product)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8 bg-indigo-600 rounded-full text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped></style>
