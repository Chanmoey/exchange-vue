<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <el-icon>
                        <ShoppingBag/>
                    </el-icon>
                    委托
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    买入
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card shadow="hover" class="container">
            <el-row>
                <!--                委托组件-->
                <el-col :span="12">
                    <OrderWidget :direction="1"></OrderWidget>
                </el-col>
                <!--                订单簿组件-->
                <el-col :span="12">
                    <OrderBook></OrderBook>
                </el-col>
            </el-row>

            <PosiList></PosiList>
        </el-card>
    </div>
</template>

<script>
import PosiList from "@/components/PosiList.vue";
import OrderWidget from "@/components/OrderWidget.vue";
import OrderBook from "@/components/OrderBook.vue";

export default {
    name: "buy",
    components: {
        PosiList,
        OrderWidget,
        OrderBook
    }
}
</script>

<style scoped>

</style>