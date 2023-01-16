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
                    历史委托
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="container">
            <HisOrderList></HisOrderList>
        </el-card>
    </div>
</template>

<script>
import HisOrderList from "@/components/HisOrderList.vue";

export default {
    name: "HisOrderQuery",
    components: {
        HisOrderList
    }
}
</script>

<style scoped>

</style>