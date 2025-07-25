import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import {
  collection,
  addDoc,
  query,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore'

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()

  const selectedCategory = ref(1)
  const categories = [
    { id: 1, name: 'Pullovers' },
    { id: 2, name: 'Shoes' },
    { id: 3, name: 'Glasses' },
  ]
  //TODO: Implement a filter to see all

  const q = query(collection(db, 'products'), orderBy('availability', 'asc'))

  const productsCollection = useCollection(q)

  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product)
  }

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product

    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value,
      })
    } else {
      await updateDoc(docRef, values)
    }
  }

  async function deleteProduct(id) {
    if (confirm('Are you sure you want to permanently delete this product?')) {
      const docRef = doc(db, 'products', id)
      const docSnapShot = await getDoc(docRef)
      const { image } = docSnapShot.data()
      const imageRef = storageRef(storage, image)

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    }
  }

  const categoryOptions = computed(() => {
    const options = [
      { label: 'Select a Category', value: '', attrs: { disabled: true } },
      ...categories.map((category) => ({ label: category.name, value: category.id })),
    ]
    return options
  })

  const noResults = computed(() => productsCollection.value.length === 0)

  const filteredProducts = computed(() => {
    return productsCollection.value.filter((product) =>
      product.category === selectedCategory.value)
  })

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    categoryOptions,
    categories,
    selectedCategory,
    productsCollection,
    noResults,
    filteredProducts,
  }
})
