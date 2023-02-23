<template>
  <div class="columns">
    <div class="column is-9" style="margin-top:8px;">
      <section class="hero is-halfheight"></section>
    </div>

    <div class="column">
      <!-- <article style="padding-top: 10px" class="message">
        <div class="message-header">

        </div>
        <div class="message-body">

        </div>
      </article> -->
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
  background: linear-gradient(rgba(255, 255, 255, 0.705),
      rgba(255, 255, 255, 0.301)),
    url("../assets/image/tl.jpg");

  background-size: cover;
}
</style>
