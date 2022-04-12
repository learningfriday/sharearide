<template>
  <div class="h-screen w-screen flex flex-col">
    <Navbar />
    <!-- <Main /> -->
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
</script>

<style lang="scss">
#app {
  height: 100vh;
  width: 100%;
}
</style>
