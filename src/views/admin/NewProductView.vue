<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Link from '@/components/Link.vue'
import useImage from '@/composables/useImage.js'
import { useProductsStore } from '@/stores/products.js'

const { onFileChange, url, imageUploaded } = useImage()
const products = useProductsStore()
const router = useRouter()

const formData = reactive({
  name: '',
  category: '',
  price: '',
  availability: '',
  image: '',
})

const submitHandler = async (data) => {
  const { image, ...values } = data

  try{
    await products.createProduct({
      ...values,
      image: url.value
    })
    router.push({name: 'products'})
  }catch (error) {
    console.log(error)
  }

}
</script>

<template>
  <div>
    <Link to="products">Back</Link>

    <h1 class="text-4xl font-black my-10">Add A New Product</h1>

    <div class="flex justify-center bg-white shadow rounded-lg">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit type="form" submit-label="Add Product" @submit="submitHandler" :value="formData">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Product Name"
            validation="required"
            :validation-messages="{ required: 'Field name is required' }"
            v-model.trim="formData.name"
          />
          <FormKit
            type="file"
            label="image"
            name="image"
            placeholder="Product image"
            validation="required"
            :validation-messages="{ required: 'Field image is required' }"
            accept=".jpg"
            multiple="true"
            @change="onFileChange"
            v-model.trim="formData.image"
          />
          <div v-if="imageUploaded">
            <p class="font-black">New Image Preview:</p>
            <img class="w-32" :src="url" alt="Product new Image" />
          </div>
          <FormKit
            type="select"
            label="Category"
            name="category"
            placeholder="Product Category"
            validation="required"
            :validation-messages="{ required: 'Field category is required' }"
            :options="products.categoryOptions"
            v-model.number="formData.category"
          />
          <FormKit
            type="number"
            label="Price"
            name="price"
            placeholder="Product price"
            validation="required"
            :validation-messages="{ required: 'Field price is required' }"
            min="1"
            v-model.number="formData.price"
          />
          <FormKit
            type="number"
            label="Availability"
            name="availability"
            placeholder="Product Availability"
            validation="required"
            :validation-messages="{ required: 'Field Availability is required' }"
            min="0"
            v-model.number="formData.availability"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
