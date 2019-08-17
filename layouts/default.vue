<template>
  <div id="mainWrapper">
    <Header />
    <div class="mainArea">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
.mainArea {
  padding-top: 60px;
  min-height: 100vh;
}
</style>


