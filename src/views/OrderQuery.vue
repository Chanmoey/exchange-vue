<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <el-icon>
                        <Notebook/>
                    </el-icon>
                    查询
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    当日委托
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card shadow="hover" class="container">
            <OrderList></OrderList>
        </el-card>
    </div>
</template>

<script>
import OrderList from "@/components/OrderList.vue";

export default {
    name: "OrderQuery",
    components:{
        OrderList
    }
}
</script>

<style scoped>

</style>