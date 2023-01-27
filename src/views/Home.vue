<template>
    <div>
        <el-container>
            <el-header style="padding: 0">
                <Header>
                </Header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <sidebar></sidebar>
                </el-aside>
                <el-main>
                    <div class="content-box" :class="{'content-collapse': collapse}">
                        <div class="content">
                            <transition name="move" mode="out-in">
                                <router-view/>
                            </transition>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import {queryBalance, queryOrder, queryPosition, queryTrade} from "@/api/exchangeApi";
import app from "@/App.vue";

export default {
    name: 'Home',
    data() {
        return {
            collapse: false
        }
    },
    components: {
        Header,
        Sidebar
    },
    methods: {},
    created() {
        this.$bus.on("collapse-content", msg => {
            this.collapse = msg
        })

        this.$bus.on("trade-change", res => {
            let trade = JSON.parse(res)
            let msg = "已成: " + (trade.direction === "BUY" ? "买入" : "卖出")
            this.$notify({
                title: "新成交",
                message: msg,
                position: "bottom-right",
                type: "success"
            })
        })
    },
    beforeUnmount() {
        this.$bus.off("collapse-content", msg => {
            this.collapse = msg
        })
    },

    // 订阅委托数据
    eventBus: {
        handlers: [
            {
                address: "order-change-" + sessionStorage.getItem("uid"),
                headers: {},
                callback: function (err, msg) {
                    queryOrder()
                    queryTrade()
                    queryPosition()
                    queryBalance()
                },
            },
            {
                address: "trade-change-" + sessionStorage.getItem("uid"),
                headers: {},
                callback: function (err, msg) {
                    app.$bus.emit("trade-change", msg.body)
                },
            }
        ],
    }
}
</script>

<style>
.el-header {
    width: 100%;
}
</style>
