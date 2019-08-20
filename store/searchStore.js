import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const state = () => ({
  isFetching: false,
  search_list: [],
  city_id: "",
  tag_id: "",
  search_key: ""
});

export const getters = {
  search_filter_list: state => {
    return state.search_list.filter(item => {
      if (state.search_key.length) {
        return (
          item.tag == state.tag_id && item.name.indexOf(state.search_key) != -1
        );
      } else return item.tag == state.tag_id;
    });
  }
};

export const actions = {};
export const mutations = {};
