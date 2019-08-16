import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const state = () => ({
  spots_info: [
    {
      id: "0",
      name: "くら寿司 藏壽司 台北館前店",
      photo_url: "spot_0.jpg",
      address: "100台北市中正區館前路12號"
    },
    {
      id: "1",
      name: "饗饗INPARADISE",
      photo_url: "spot_1.jpg",
      address: "110台北市信義區忠孝東路五段68號"
    },
    {
      id: "2",
      name: "貓下去敦北俱樂部",
      photo_url: "spot_2.jpg",
      address: "No, No. 218敦化北路松山區台北市105"
    }
  ],
  searchBar_flag: false,
  locales: ["zh_tw", "en"],
  locale: "zh_tw"
});

export const getters = {
  get_spots_info: state => state.spots_info
};

export const actions = {
  getStatus({ commit }, status) {
    commit("setStatus", status);
  }
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
