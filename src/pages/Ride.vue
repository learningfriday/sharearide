<template>
  <div v-if="userName" class="main">
    <div class="main">
      <Navbar />
      <Map />
    </div>
    <div class="rider-request-container">
      <div class="rider-request">
        <LocationSelector
          @location-selected="handleLocationSelected"
          theme="ride"
          :title="{
            start: 'Your Pickup Location',
            end: 'Your Dropoff Location',
          }"
          :help="{
            start: 'Enter Your Pickup Location',
            end: 'Enter Your Dropoff Location',
          }"
        />
        <Confirm :is-location-selected="state.isLocationSelected" />
      </div>
    </div>
  </div>
  <div class="card" v-else>Please <a href="login">login</a> to continue</div>
</template>

<script lang="ts" setup>
import { inject, reactive, Ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Map from "@/components/Map.vue";
import LocationSelector from "@/components/LocationSelector.vue";
import Confirm from "@/components/Confirm.vue";

const userName = inject("UserName") as Ref<string>;
console.log(userName);
const state = reactive({
  isLocationSelected: false,
});
const handleLocationSelected = (data: any) => {
  state.isLocationSelected = data.isSelected;
};
</script>

<style scoped lang="scss">
.main {
  @apply h-full w-screen flex-1 z-0;
}
.rider-request-container {
  @apply h-full w-[400px] ml-1 py-3 absolute left-0 top-0 flex flex-col justify-end;
}
.rider-request {
  @apply h-full max-h-[500px] bg-white rounded-lg flex flex-col overscroll-auto;
}
</style>
