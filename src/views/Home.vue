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
    },
    beforeUnmount() {
        this.$bus.off("collapse-content", msg => {
            this.collapse = msg
        })
    }
}
</script>

<style>
.el-header {
    width: 100%;
}
</style>
