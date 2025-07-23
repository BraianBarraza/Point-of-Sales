<script setup>
import { useCartStore } from '@/stores/cart.js'
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
import Amount from '@/components/Amount.vue'
import { formatCurrency } from '../helpers/index.js'
import CouponForm from '@/components/CouponForm.vue'

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

    <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        {{ formatCurrency(cart.subTotal) }}
      </Amount>
      <Amount>
        <template #label>Taxes:</template>
        {{ formatCurrency(cart.taxes) }}
      </Amount>
      <Amount>
        <template #label>Total:</template>
        {{ formatCurrency(cart.total) }}
      </Amount>
    </dl>

    <CouponForm/>

  </div>
</template>

<style scoped></style>
