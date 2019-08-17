import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const state = () => ({
  spots_info: [
    {
      id: "0",
      name: "くら寿司 藏壽司 台北館前店",
      photo_url: "spot_0.jpg",
      address: "100台北市中正區館前路12號",
      star_count: 4.5
    },
    {
      id: "1",
      name: "饗饗INPARADISE",
      photo_url: "spot_1.jpg",
      address: "110台北市信義區忠孝東路五段68號",
      star_count: 4.0
    },
    {
      id: "2",
      name: "貓下去敦北俱樂部",
      photo_url: "spot_2.jpg",
      address: "No, No. 218敦化北路松山區台北市105",
      star_count: 4.5
    },
    {
      id: "3",
      name: "富錦樹台菜香檳",
      photo_url: "spot_3.jpg",
      address: "10548台北市松山區敦化北路199巷17號",
      star_count: 5.0
    },
    {
      id: "4",
      name: "くら寿司 藏壽司 台北館前店",
      photo_url: "spot_0.jpg",
      address: "100台北市中正區館前路12號",
      star_count: 4.5
    },
    {
      id: "5",
      name: "饗饗INPARADISE",
      photo_url: "spot_1.jpg",
      address: "110台北市信義區忠孝東路五段68號",
      star_count: 4.0
    },
    {
      id: "6",
      name: "貓下去敦北俱樂部",
      photo_url: "spot_2.jpg",
      address: "No, No. 218敦化北路松山區台北市105",
      star_count: 4.5
    },
    {
      id: "7",
      name: "富錦樹台菜香檳",
      photo_url: "spot_3.jpg",
      address: "10548台北市松山區敦化北路199巷17號",
      star_count: 5.0
    }
  ],
  classify_info: [
    {
      id: 0,
      name: "壽司",
      photo_url: "class_0.jpg"
    },
    {
      id: 1,
      name: "拉麵",
      photo_url: "class_1.jpg"
    },
    {
      id: 2,
      name: "Buffet",
      photo_url: "class_2.jpg"
    },
    {
      id: 3,
      name: "台菜",
      photo_url: "class_3.jpg"
    },
    {
      id: 4,
      name: "火鍋",
      photo_url: "class_4.jpg"
    },
    {
      id: 5,
      name: "牛排",
      photo_url: "class_5.jpg"
    },
    {
      id: 6,
      name: "韓式料理",
      photo_url: "class_6.jpg"
    },
    {
      id: 7,
      name: "甜點",
      photo_url: "class_7.jpg"
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
