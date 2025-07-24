<script setup>
import {useCouponStore} from '@/stores/coupons.js'

const couponStore = useCouponStore()

</script>

<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-200">
    Got a promo code?
  </p>
  <div class="flex">
    <input
      type="text"
      placeholder="Enter your code"
      class="p-2 bg-white w-full border-gray-300"
      v-model = couponStore.couponInput
    />

    <button
      type="button"
      class="p-3 bg-green-400 font-bold disabled:opacity-35"
      @click="couponStore.applyCoupon"
      :disabled="couponStore.isCouponValid"
    >
      Apply
    </button>
  </div>

  <p class="py-2 text-center text-sm font-extrabold">
    {{couponStore.couponValidationMessage}}
  </p>
</template>

<style scoped>

</style>
