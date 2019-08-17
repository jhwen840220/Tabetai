import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const state = () => ({
  city: []
});

export const getters = {
  get_spots_info: state => state.spots_info
};

export const actions = {
  getStatus({ commit }, status) {
    commit("setStatus", status);
  }
};
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  }
};
