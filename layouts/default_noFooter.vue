<template>
  <div id="mainWrapper"  :class="[device=='web'? 'webView':'mobileView']">
    <Header />
    <div class="mainArea_noFooter">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { getDevice } from "~/helpers";

export default {
  data() {
    return {
      device: ""
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.device = getDevice();
  }
};
</script>

<style lang="scss">
.mainArea_noFooter {
  padding-top: 60px;
  min-height: 100vh;
}
</style>


