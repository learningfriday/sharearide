<template>
  <div class="navbar">
    <div class="left-menu">
      <div class="logo">
        <router-link to="/">ECP</router-link>
      </div>
      <div class="menu-item">
        <router-link to="ride">Ride</router-link>
      </div>
      <div class="menu-item">
        <router-link to="drive">Drive</router-link>
      </div>
      <!-- <div class="menu-item">More</div> -->
    </div>
    <div class="right-menu">
      <div class="menu-item">Help</div>
      <div class="menu-item avatar-container">
        <i class="bi bi-person-circle"></i>
        {{ userName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "@vue/runtime-core";
import { Ref } from "vue";

const userName = inject("UserName") as Ref<string>;
</script>

<style scoped lang="scss">
.navbar {
  @apply h-16 w-full bg-black text-white flex md:justify-around items-center px-60 fixed z-10;
  .left-menu {
    @apply flex gap-3 items-center;
    .logo {
      @apply text-3xl text-white flex cursor-pointer mr-16;
    }
  }
  .right-menu {
    @apply flex gap-3 items-center;
  }
  .menu-item {
    @apply text-lg text-white items-center mx-4 cursor-pointer;
  }
  .avatar-container {
    @apply mr-2 flex gap-1;
  }
}
</style>
