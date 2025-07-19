<script setup>
import Link from '@/components/Link.vue'
import Product from '@/components/Product.vue'
import { useProductsStore } from '@/stores/products.js'

const products = useProductsStore()
</script>

<template>
  <div>
    <Link to="new-product"> New Product</Link>
    <h1 class="text-4xl font-black my-10">Products</h1>

    <p v-if="products.noResults">No Results</p>

    <ul v-else role="list" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      <Product
        v-for="product in products.productsCollection"
        :key="product.id"
        :product="product"
      />
    </ul>
  </div>
</template>

<style scoped></style>
