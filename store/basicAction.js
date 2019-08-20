import Vue from "vue";
import Vuex from "vuex";
import { db } from "~/plugins/firebase.js";
Vue.use(Vuex);

export const actions = {
  update_data({ commit }, { storeName, data }) {
    commit("update_data", { storeName: storeName, data: data }, { root: true });
  },
  async onSubmit({ commit }, { api, postData }) {
    const res = await api(postData);

    if (res && res.header.status === "100") {
      return submitSuccess(res);
    } else {
      return await Promise.reject({ text: res.header.desc });
    }
  },

  async getList({ commit, rootState }, { storeName, api, postData }) {
    const res = await api(postData);
    if (res && res.header.status === "100") {
      const data = res.body;
      const newStoreState = formatResData(data);
      commit(
        "update_data",
        { storeName: storeName, data: { list: newStoreState.list } },
        { root: true }
      );
    } else {
      return await Promise.reject({ text: res.header.desc });
    }
  },

  getData_byFirebase({ commit }, { storeName, route, listName }) {
    db.ref(route).once("value", function(snapshot) {
      var data = snapshot.val();
      if (data) {
        const dataArr = Object.keys(data.data).reduce((pre = [], item) => {
          pre.push(data.data[item]);
          return pre;
        }, []);

        commit(
          "update_data",
          {
            storeName: storeName,
            data: { [listName]: dataArr }
          },
          { root: true }
        );
      } else {
        commit(
          "update_data",
          {
            storeName: storeName,
            data: { [listName]: [] }
          },
          { root: true }
        );
      }
    });
  },
  pushData_byFirebase({ commit }, { route, postData }) {
    db.ref(route)
      .push(postData)
      .then(function() {
        alert("建立成功");
      })
      .catch(function() {
        alert("伺服器發生錯誤，請稍後再試");
      });
  }
};

const submitSuccess = res => {
  return Promise.resolve({ text: "成功" });
};

const formatResData = resData => {
  return {
    list: resData["data"],
    total: resData.total_count
  };
};
