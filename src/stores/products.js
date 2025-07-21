import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc, where, query, limit, orderBy, updateDoc } from 'firebase/firestore'

export const useProductsStore = defineStore('products', () => {

  const db = useFirestore()


  const categories = [
    { id: 1, name: 'Pullovers' },
    { id: 2, name: 'Shoes' },
    { id: 3, name: 'Glasses' }
  ]

  const q = query(
    collection(db, 'products'),
    orderBy('availability', 'asc')
  )

  const productsCollection = useCollection(q)

  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product)
  }

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product

    if (image.length) {
      await updateDoc(docRef, {
          ...values,
          image: url.value
        }
      )
    } else {
      await updateDoc(docRef, values)
    }

  }

  async function deleteProduct(id) {

  }

  const categoryOptions = computed(() => {
    const options = [
      { label: 'Select a Category', value: '', attrs: { disabled: true } },
      ...categories.map((category) => ({ label: category.name, value: category.id }))
    ]
    return options
  })

  const noResults = computed(() => productsCollection.value.length === 0)
  return {
    createProduct,
    updateProduct,
    deleteProduct,
    categoryOptions,
    productsCollection,
    noResults
  }
})
