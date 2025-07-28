import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'
import { collection, addDoc, runTransaction, doc } from 'firebase/firestore'
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
    taxes.value = Number((subTotal.value * TAX_RATE).toFixed(2))
    total.value = Number((subTotal.value + taxes.value - coupon.discount).toFixed(2))
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
        items: items.value.map(item => {
          const { availability, category, ...data } = item
          return data
        }),
        subTotal: subTotal.value,
        taxes: taxes.value,
        discount: coupon.discount,
        total: total.value,
        date: getCurrentDate()
      })

      //Availability subtraction
      items.value.forEach(async (item) => {
        const productRef = doc(db, 'products', item.id)
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef)
          const availability = currentProduct.data().availability - item.quantity
          transaction.update(productRef, { availability })
        })
      })

      //State Reset
      $reset()
      coupon.$reset()

    } catch (error) {
      console.error(error)
    }
  }

  function $reset() {
    items.value = []
    subTotal.value = 0
    taxes.value = 0
    total.value = 0
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
    checkProductAvailability
  }
})
