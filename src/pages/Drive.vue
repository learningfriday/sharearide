<template>
  <div v-if="userName" class="main">
    <div class="main">
      <Navbar />
      <Map :search-location="{ start: state.start, end: state.end }" />
    </div>
    <div class="request-container">
      <div class="request">
        <LocationSelector
          theme="drive"
          @location-selected="handleLocationSelected"
          :title="{ start: 'Your Current Location', end: 'Your Destination' }"
          :help="{
            start: 'Enter Your Current Location',
            end: 'Enter Your Destination',
          }"
        />
        <Confirm :is-location-selected="state.isSelected" />
      </div>
    </div>
  </div>
  <div class="card" v-else>Please <a href="login">login</a> to continue</div>
</template>

<script lang="ts" setup>
import { inject, onMounted, reactive, Ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Map from "@/components/Map.vue";
import LocationSelector from "@/components/LocationSelector.vue";
import Confirm from "@/components/Confirm.vue";

const userName = inject("UserName") as Ref<string>
console.log(userName.value)
const state = reactive({
  isSelected: false,
  start: "",
  end: "",
});
const handleLocationSelected = (data: any) => {
  state.end = data.endingPoint;
  state.start = data.startingPoint;
  state.isSelected = data.isSelected;
};
onMounted(() => {});
</script>

<style scoped lang="scss">
.main {
  @apply h-full w-screen flex-1 z-0;
}
.request-container {
  @apply h-full w-[400px] ml-1 py-3 absolute left-0 top-0 flex flex-col justify-end;
}
.request {
  @apply h-full max-h-[500px] bg-green-100 rounded-lg flex flex-col overscroll-auto;
}
</style>
