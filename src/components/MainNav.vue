<script setup>
import Link from '@/components/Link.vue'
import Logo from '@/components/Logo.vue'
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
    <div>
      <Logo/>
    </div>

    <nav>
      <Link to="admin"> Administration </Link>
    </nav>
  </header>
</template>

<style scoped></style>
