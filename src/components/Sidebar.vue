<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu"
                 background-color="#000000"
                 text-color="#C0C4CC"
                 active-text-color="#409EFF"
                 unique-opened
                 router
                 :collapse="collapse"
                 :default-active="onRoutes">
            <template v-for="item in items">
                <!--                有子节点-->
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index">
                        <template #title>
                            <el-icon size="small">
                                <component class="icons" :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-menu-item :index="subItem.index">
                                <span slot="title">{{ subItem.title }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>

                <template v-else>
                    <el-menu-item :index="item.index">
                        <el-icon size="small">
                            <component class="icons" :is="item.icon"></component>
                        </el-icon>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>

            </template>
        </el-menu>
    </div>

</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'PieChart',
                    index: 'dashboard',
                    title: '资金股份'
                },
                {
                    icon: 'ShoppingBag',
                    index: 'buy',
                    title: '买入'
                },
                {
                    icon: 'Tickets',
                    index: 'sell',
                    title: '卖出'
                },
                {
                    icon: 'Search',
                    index: '3',
                    title: '查询',
                    subs: [
                        {
                            index: 'orderQuery',
                            title: '当日委托'
                        },
                        {
                            index: 'tradeQuery',
                            title: '当日成交'
                        },
                        {
                            index: 'hisOrderQuery',
                            title: '历史委托'
                        },
                        {
                            index: 'hisTradeQuery',
                            title: '历史成交'
                        },
                    ]
                },

                {
                    icon: 'CreditCard',
                    index: '4',
                    title: '银证业务',
                    subs: [
                        {
                            index: 'transfer',
                            title: '银证转账'
                        },
                        {
                            index: 'transferQuery',
                            title: '转账查询'
                        },
                    ]
                },
                {
                    icon: 'Setting',
                    index: 'pwdSetting',
                    title: '修改密码'
                },
            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '')
        }
    },
    methods: {
        collapseChange(msg) {
            this.collapse = msg
            this.$bus.emit("collapse-content", msg)
        }
    },
    created() {
        this.$bus.on("collapse", msg => {
            this.collapseChange(msg)
        })
    },
    beforeUnmount() {
        this.$bus.off("collapse", msg => {
            this.collapseChange(msg)
        })
    }
}
</script>

<style lang="scss">
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;

    .el-menu-item {
        min-width: 150px;
    }

    li {
        text-align: left;

        .el-tooltip {
            width: auto ! important;
        }
    }

    /*下拉导航菜单多出1px*/
    .el-menu {
        border-right-width: 0;
    }

    .el-menu--collapse {
        width: auto ! important;
    }
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 150px;
}

.sidebar > ul {
    height: 100%;
}
</style>