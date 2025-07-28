import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSalesStore = defineStore('sales', () => {

  const date = ref("")

  return {
    date,
  }

})
