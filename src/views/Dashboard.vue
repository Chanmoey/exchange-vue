<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <el-icon>
                        <PieChart/>
                    </el-icon>
                    资金股份
                </el-breadcrumb-item>
            </el-breadcrumb>

            <el-card style="margin-top: 10px" class="container">
                <PosiList></PosiList>
            </el-card>
        </div>
    </div>
</template>

<script>
import PosiList from "@/components/PosiList.vue";

export default {
    name: "Dashboard",
    components: {
        PosiList
    }
}
</script>

<style scoped>

</style>