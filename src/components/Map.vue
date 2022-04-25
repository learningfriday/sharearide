<template>
  <div id="map" class="wrapper" />
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import mapboxgl from "mapbox-gl";
interface IMapProps {
  searchLocation?: {
    start: string;
    end: string;
  };
}
let props = defineProps<IMapProps>();
let map: mapboxgl.Map;
mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
const initMap = (lat: any, lng: any) => {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    zoom: 15,
    center: [lng, lat],
  });
  map.on("load", () => {
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  });
};
onMounted(() => {
  navigator.geolocation.getCurrentPosition((e) => {
    initMap(e.coords.latitude, e.coords.longitude);
  });
  watch<IMapProps>(props, (value: IMapProps) => {
    if (value.searchLocation?.start) {
      var latLng = value.searchLocation.start;
      var l = new mapboxgl.LngLat(parseFloat(latLng[0]), parseFloat(latLng[1]));
      new mapboxgl.Marker().setLngLat(l).addTo(map);
      map.setCenter(l);
    }
  });
});
</script>

<style scoped lang="scss">
.wrapper {
  @apply flex-1 h-full w-full items-center;
}
</style>
