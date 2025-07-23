import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useCouponStore = defineStore('coupon', ()=> {
  const couponInput = ref('')

  const VALID_COUPONS = [
    {name: '10DISCOUNT', discount: .10},
    {name: '20DISCOUNT', discount: .20}
  ]


  function applyCoupon() {

  }

  return{
    couponInput,
    applyCoupon,
  }
})
