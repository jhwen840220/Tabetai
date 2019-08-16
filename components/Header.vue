<template>
  <div class="header">
    <div class="logo mr-2"></div>
    <div :class="`searchBar ${!searchBar_flag?'hidden':''}`">
      <a-input placeholder="Basic usage"/>
      <a-icon type="search" class="ml-2" />
    </div>
    <div class="btnGroup">
      <div class="btn">登入</div>
      <div class="btn">註冊</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Select, Input, Icon } from "ant-design-vue";
export default {
  components: {
    [Input.name]: Input,
    [Icon.name]: Icon
  },
  methods: {
    // handleChange(value) {
    //   console.log(`selected ${value}`);
    // }
  },
  computed: {
    ...mapState(["searchBar_flag"])
  }
};
</script>


<style lang="scss">
.header {
  position: fixed;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background-color: #c8dad3;
  display: flex;
  align-items: center;
  z-index: 100;
  .logo {
    background-color: #63707e;
    height: 100%;
    width: 150px;
  }
  .searchBar {
    display: flex;
    align-items: center;
    &.hidden {
      display: none;
    }
  }
  .btnGroup {
    margin-left: auto;
    .btn {
      cursor: pointer;
      border-radius: 20px;
      background-color: #63707e;
      color: #fff;
      text-align: center;
      padding: 6px 18px;
    }
  }
}
</style>
