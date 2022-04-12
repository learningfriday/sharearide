<template>
  <div v-if="isLocationSelected" class="wrapper">
    Display a list of people depending on view
  </div>
</template>

<script lang="ts" setup>
interface IConfirmProps {
  isLocationSelected: boolean;
  listOfPersons?: [];
}
const props = defineProps<IConfirmProps>();
</script>

<style scoped>
.wrapper {
  @apply ml-4 mr-4 mt-2 border h-screen mb-5 p-2;
}
</style>
