import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useCouponStore } from '@/stores/coupons.js'
import { getCurrentDate } from '@/helpers/index.js'

export const useCartStore = defineStore('cart', () => {
  const coupon = useCouponStore()
  const db = useFirestore()
  const items = ref([])
  const subTotal = ref(0)
  const taxes = ref(0)
  const total = ref(0)

  const MAX_PRODUCTS = 8

  const TAX_RATE = 0.19

  watchEffect(() => {
    subTotal.value = items.value.reduce((total, item) => total + item.price * item.quantity, 0)
    taxes.value = subTotal.value * TAX_RATE
    total.value = subTotal.value + taxes.value - coupon.discount
  })

  function addItem(item) {
    const index = isItemInCart(item.id)
    if (index >= 0) {
      if (isProductAvailable(item, index)) {
        alert('You have reached the maximum number of items allowed per order.')
        return
      }
      items.value[index].quantity++
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id })
    }
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) => (item.id === id ? { ...item, quantity } : item))
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  async function checkout() {
    try {
      await addDoc(collection(db, 'sales'), {
        items: items.value,
        subTotal: subTotal.value,
        taxes: taxes.value,
        discount: coupon.discount,
        total: total.value,
        date: getCurrentDate(),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id)

  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    )
  }

  const isEmpty = computed(() => items.value.length === 0)

  const checkProductAvailability = computed(() => {
    return (product) => (product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS)
  })
  return {
    addItem,
    removeItem,
    updateQuantity,
    checkout,
    subTotal,
    taxes,
    total,
    isEmpty,
    items,
    checkProductAvailability,
  }
})
