import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const state = () => ({
  comment_list: [],
  detail: []
});

export const getters = {
  format_detail: state => {
    if (state.detail.length) {
      return state.detail[0];
    } else
      return {
        address: "",
        center: {
          lat: 0,
          lng: 0
        },
        name: "",
        off_day: "",
        open_time: "",
        phone: "",
        photo_urls: [],
        rate: 0,
        tag: ""
      };
  }
};

export const actions = {};
export const mutations = {};
