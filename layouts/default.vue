<template>
  <div id="mainWrapper">
    <Header />
    <div class="mainArea">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
.mainArea {
  padding-top: 60px;
  min-height: 100vh;
}
</style>


