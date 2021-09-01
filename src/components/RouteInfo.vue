<template>
  <div>
    <GmapMap :zoom="7" :center="{ lat: 40, lng: -80 }">
      <DirectionsRenderer ref="directionsRenderer" travelMode="DRIVING" :origin="start" :destination="end" />
    </GmapMap>
  </div>
</template>

<script>
import DirectionsRenderer from "@/components/DirectionsRenderer1";

export default {
  components: {
    DirectionsRenderer
  },
  distance: '',
  duration:'',
  data: () => ({
    start: "London, Heathrow",
    end: "Paris"
  }),
  created: function () {
    // `this` 指向 vm 实例
    console.log("你好大家好👊");
    //this.distance = this.34.150.38.10['dir']
    //console.log("routeInfo : " + this.distance);
  },
  afterCreate(){

  }
};
</script>

<style>
.vue-map-container {
  height: 500px;
}
</style>
