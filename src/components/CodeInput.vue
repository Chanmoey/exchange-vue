<template>
    <el-autocomplete style="width: 100%;" size="small" placeholder="代码/简称"
                     :fetch-suggestions="querySearchAsync" :trigger-on-focus="false"
                     :debounce="100" @select="updateInput" v-model="state">
    </el-autocomplete>
</template>

<script>
export default {
    name: "CodeInput",
    data() {
        return {
            state: ''
        }
    },
    methods: {
        querySearchAsync(queryString, callback) {

        },
        updateInput(item) {
            this.state = ('000000' + item.code).slice(-6)

            this.$bus.emit("code-input-selected", item)
        }
    }
}
</script>

<style lang="scss">
.wide-dropdown {
    width: 600px !important;
}
</style>