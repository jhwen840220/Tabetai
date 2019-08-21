<template>
  <div class="header">
    <nuxt-link to="/">
      <div class="logo mr-2">
        <div>Tabetai</div>
      </div>
    </nuxt-link>
    <div :class="`searchBar ${!searchBar_flag?'hidden':''}`" v-if="searchBar_hide">
      <form class="input-group input-group-sm" @submit="sendToSearch">
        <input
          type="text"
          class="form-control"
          placeholder="請輸入關鍵字"
          :value="header_search_key"
          @change="changeKey"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary d-flex align-items-center justidy-content-center"
          >
            <a-icon class="mx-1" type="search" />
          </button>
        </div>
      </form>
    </div>
    <div class="menuToggle" :class="{opened: menu_flag}" @click="menu_flag=!menu_flag">
      <span />
      <span />
      <span />
    </div>
    <div class="btnGroup" :class="{opened: menu_flag}">
      <div class="btn" @click="changeLang">{{locale=="zh_TW"?"Eng":"中"}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Select, Input, Icon } from "ant-design-vue";
import { getCookie, setCookie } from "~/helpers";

export default {
  data() {
    return {
      header_search_key: "",
      searchBar_hide: false,
      menu_flag: false
    };
  },
  components: {
    [Input.name]: Input,
    [Icon.name]: Icon
  },
  methods: {
    ...mapActions({
      update_data: "basicAction/update_data"
    }),
    detectWidth() {
      if (document.body.clientWidth <= 768) {
        this.searchBar_hide = false;
      } else this.searchBar_hide = true;
    },
    test() {
      var element = document.getElementById("firstAnchor");
      element.scrollIntoView({ behavior: "smooth" });

      // location.href  = '#firstAnchor';
    },
    changeKey(e) {
      this.header_search_key = e.target.value;
    },
    sendToSearch(e) {
      if (e) e.preventDefault();
      if (this.header_search_key.length) {
        this.update_data({
          data: { search_key: this.header_search_key }
        });
        this.$router.push({
          path: "search"
        });
      }
    },
    changeLang() {
      const lang = getCookie("lang");

      if (lang == "en") setCookie("lang", "zh_TW");
      else setCookie("lang", "en");

      this.update_data({ data: { locale: getCookie("lang") } });
      this.$root.$i18n.locale = getCookie("lang");
    }
  },
  computed: {
    ...mapState(["searchBar_flag", "locale"])
  },
  mounted() {
    this.detectWidth();
    window.addEventListener("resize", this.detectWidth);

    this.update_data({ data: { locale: getCookie("lang") } });
    this.$root.$i18n.locale = getCookie("lang");
  },
  destroyed() {
    window.removeEventListener("resize", this.detectWidth);
  }
};
</script>


<style lang="scss">
.header {
  position: fixed;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background-color: #64c4ed;
  display: flex;
  align-items: center;
  z-index: 100;

  .logo {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    font-family: "Knewave", cursive;
    height: 100%;
    width: 150px;
    font-size: 30px;
    div {
      display: inline-block;
      padding: 0 5px;
      background-image: -webkit-linear-gradient(
        45deg,
        #ffb422,
        #d76d77,
        #4b3201
      );
      background-clip: text;
      -webkit-background-clip: text;
      color: #ffb422;
      // 沒辦法漸層的瀏覽器
      -webkit-text-fill-color: transparent;
    }
  }
  .searchBar {
    display: flex;
    visibility: visible;
    align-items: center;
    &.hidden {
      visibility: hidden;
    }
  }
  .btnGroup {
    margin-left: auto;
    .btn {
      cursor: pointer;
      border-radius: 10px;
      background-color: #407088;
      box-shadow: 1px 1px 8px 2px #042f4b;
      color: white;
      text-align: center;
      padding: 4px 15px;
      &:active {
        transform: translate(1px, 1px);
        box-shadow: 0px 0px 8px 0 #042f4b;
      }
    }
  }
  @media (max-width: 768px) {
    .btnGroup {
      position: fixed;
      top: 60px;
      right: 0;
      height: 0;
      padding: 0 50px;
      background: white;
      overflow-y: hidden;
      transition: height 0.5s;
      filter: drop-shadow(-3px 3px 3px rgba(0, 0, 0, 0.3));
      .btn {
        margin-bottom: 10px;
        display: block;
        padding-left: 30px;
        padding-right: 30px;
        &:first-child {
          margin-top: 10px;
        }
        &:last-child {
          margin-bottom: 10px;
        }
      }
      &.opened {
        height: 55px;
      }
    }
  }
  .menuToggle {
    display: none;
    cursor: pointer;
    right: 24px;
    position: absolute;
    margin-top: 2.5px;
    @media (max-width: 768px) {
      display: block;
    }
    span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: #df8702;
      border-radius: 3px;
      z-index: 1;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
      &:first-child {
        transform-origin: 0% 0%;
      }
      &:nth-last-child(2) {
        transform-origin: 0% 100%;
      }
    }
    &.opened span {
      opacity: 1;
      background: #232323;
      &:last-child {
        transform: rotate(-45deg) translate(-1px, 2px);
      }
      &:nth-last-child(2) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
      &:first-child {
        transform: rotate(45deg) translate(3px, -3px);
      }
    }
  }
}
</style>
