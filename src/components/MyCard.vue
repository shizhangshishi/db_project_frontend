<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 7 : 0" class="mb-12">
      <slot></slot>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: 'MyCard'
  }
</script>
