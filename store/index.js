import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const state = () => ({
  spots_info: [],
  classify_info: [],
  searchBar_flag: false,
  locales: ["zh_tw", "en"],
  locale: "zh_tw",
  search_key: "",
  city_id: "A"
});

export const getters = {
  get_spots_info: state => state.spots_info,
};

export const actions = {
  getStatus({ commit }, status) {
    commit("setStatus", status);
  },
  //   refreshToken({ commit }) {
  //     commit("update_data", { storeName: "layoutStore", data: { token: token } });
  //   }
};
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  },

  update_data(state, { storeName, data }) {
    Object.keys(data).forEach(item => {
      if (storeName) state[storeName][item] = data[item];
      else state[item] = data[item];
    });
  }
};

// const store = () => {
//     return new Vuex.Store({
//         state,
//         getters,
//         mutations,
//         actions,
//         modules: {
//             layoutStore
//         }
//     })
// }

// export default store
