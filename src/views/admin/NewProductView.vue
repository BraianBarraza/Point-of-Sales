<script setup>
import Link from '@/components/Link.vue'
</script>

<template>
  <div>
    <Link to="products"> Back</Link>

    <h1 class="text-4xl font-black my-10">Add A New Product</h1>

    <div class="flex justify-center bg-white shadow rounded-lg">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit type="form" submit-label="Add Product">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Product Name"
            validate="required"
            :validation-messages="{required: 'Field name is required'}"
          />
          <FormKit
            type="file"
            label="image"
            name="image"
            placeholder="Product image"
            validate="required"
            :validation-messages="{required: 'Field image is required'}"
            accept="jpg,jpeg,png"
            multiple="true"
          />
          <FormKit
            type="select"
            label="Category"
            name="category"
            placeholder="Product Category"
            validate="required"
            :validation-messages="{required: 'Field category is required'}"
            :options="[1,2,3]"
          />
          <FormKit
            type="number"
            label="Price"
            name="price"
            placeholder="Product price"
            validate="required"
            :validation-messages="{required: 'Field price is required'}"
            min="1"
          />
          <FormKit
            type="number"
            label="Availability"
            name="availability"
            placeholder="Product Availability"
            validate="required"
            :validation-messages="{required: 'Field Availability is required'}"
            min="0"
          />

        </FormKit>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
