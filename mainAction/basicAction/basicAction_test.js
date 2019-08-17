export default class extendAction {
    constructor({ storeName, defaultState, defaultGetters, defaultActions, defaultMutations }) {

        /** 透過 storeName 產生action name 及 mutations name */
        this.storeName = storeName || 'defaultStore';
        /** 不去更改 actions 內的 this 指向 */
        const ctx = this;

        this.state = defaultState;
        this.getters = { ...defaultGetters };
        this.actions = {
            ...defaultActions,

            [`${this.storeName}_updateData`]({ commit, state }, status) {
                commit(`${ctx.storeName}_update_data_mutation`, status);
            },
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