// 资金相关的Api接口

import {getRequest, postRequest} from "@/api/axiosCommon";
import store from "@/store";

export const queryBalance = () => {
    getRequest("/api/balance").then(resp => {
        if (resp) {
            store.commit("updateBalance", resp.data)
        }
    })
}

export const queryOrder = () => {
    getRequest("/api/order").then(resp => {
        if (resp) {
            store.commit("updateOrder", resp.data)
        }
    })
}

export const queryTrade = () => {
    getRequest("/api/trade").then(resp => {
        if (resp) {
            store.commit("updateTrade", resp.data)
        }
    })
}

export const queryPosition = () => {
    getRequest("/api/position").then(resp => {
        if (resp) {
            console.log(resp.data)
            store.commit("updatePosition", resp.data)
        }
    })
}