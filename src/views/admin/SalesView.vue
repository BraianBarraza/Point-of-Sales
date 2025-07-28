<script setup>
import { ref } from 'vue'
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import { useSalesStore } from '@/stores/sales.js'

const sales = useSalesStore()
const dateFormatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMMM',
})

</script>

<template>
  <h1 class="text-4xl font-black my-10">Sales Balance</h1>

  <div class="md:flex md:items-start gap-5 ">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center">
      <VueTailwindDatePicker
        as-single
        no-input
        v-model="sales.date"
        :formatter="dateFormatter"
      />
    </div>
    <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
      <p>Sales</p>
      {{sales.date}}
    </div>

  </div>
</template>

<style scoped>

</style>
