<template>
  <div class="columns">
    <div class="column container" style="margin-top: 8px">
      <section class="hero is-halfheight"></section>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  components: {},
};
</script>

<style scoped lang="scss">
// Home page
.links {
  padding-top: 15px;
}

.hero {
  background: url("../assets/image/tuan.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
