<template>
  <div class="home">
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fde500; // TODO: create variables file
}
.bg {
  height: 100%;
  width: 100%;
  max-width: 768px;
  margin: auto;
  background: url('../assets/mtrack_promo.svg') center no-repeat;
}

</style>
