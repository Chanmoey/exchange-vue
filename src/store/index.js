import {createStore} from 'vuex'

export default createStore({
    state: {
        positionData: [],
        orderData: [],
        tradeData: [],
        balance: 0,
    },
    getters: {},
    mutations: {
        updatePosition(state, position) {
            state.positionData = position
        },
        updateOrder(state, order) {
            state.orderData = order
        },
        updateTrade(state, trade) {
            state.tradeData = trade
        },
        updateBalance(state, balance) {
            state.balance = balance
        },
    },
    actions: {},
    modules: {}
})
