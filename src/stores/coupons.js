import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCartStore } from '@/stores/cart.js'

export const useCouponStore = defineStore('coupon', () => {
  const cart = useCartStore()
  const couponInput = ref('')
  const couponValidationMessage = ref('')
  const discountPercentage = ref(0)
  const discount = ref(0)

  const VALID_COUPONS = [
    { name: '10DISCOUNT', discount: 0.1 },
    { name: '20DISCOUNT', discount: 0.2 },
  ]

  watch(discountPercentage, () => {
    discount.value = (cart.subTotal * discountPercentage.value).toFixed(2)
  })

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      discountPercentage.value = VALID_COUPONS.find(
        (coupon) => coupon.name === couponInput.value,
      ).discount
      couponValidationMessage.value = 'Discount successfully applied!'
    } else {
      couponValidationMessage.value = 'Invalid Coupon Number'
    }
    setTimeout(() => {
      couponValidationMessage.value = ''
    }, 5000)
  }

  const isCouponValid = computed(() => discountPercentage.value > 0)

  return {
    applyCoupon,
    couponInput,
    couponValidationMessage,
    discount,
    isCouponValid
  }
})
