import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import exportAction from '~/mainAction/basicAction';

export default class basicDetailAction {
    constructor({ storeName, defaultState, defaultGetters, defaultActions, defaultMutations }) {

        /** 透過 storeName 產生action name 及 mutations name */
        this.storeName = storeName || 'basicDetailStore';
        /** 不去更改 actions 內的 this 指向 */
        const ctx = this;

        this.state = defaultState;
        this.getters = { ...defaultGetters };
        this.actions = {
            ...defaultActions,
            [`${this.storeName}_updateData`]({ commit }, status) {

                console.log('update_data', status)
                commit(`${ctx.storeName}_update_data_mutation`, status);
            }
        };
        this.mutations = {
            ...defaultMutations,
            [`${this.storeName}_update_data_mutation`](state, status) {
                console.log('run mutation')
                console.log(state)
                Object.assign(state, status)
            }
        };
    }
}