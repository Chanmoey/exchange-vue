<template>
    <div>
        <el-row>
            <el-col style="margin-bottom: 10px" :span="5">
                可用资金: {{ balance }}
            </el-col>
        </el-row>

        <el-row>
            <el-table
                :data="tableData.slice(
                    (query.currentPage - 1) * query.pageSize,
                    query.currentPage * query.pageSize
                )"
                border
                @sort-change="changeTableSort"
            >
                <el-table-column align="center" prop="code" label="代码"
                                 :formatter="codeFormatter"
                                 sortable :sort-orders="['ascending', 'descending']"/>

                <el-table-column align="center" prop="name" label="名称"/>

                <el-table-column align="center" prop="count" label="股票数量"/>

                <el-table-column align="center" prop="cost" label="总投入"
                                 :formatter="montyFormatter"/>

                <el-table-column align="center" prop="" label="成本"
                                 :formatter="costFormatter"/>
            </el-table>
        </el-row>
        <div class="pagination">
            <el-button size="small" round type="primary"
                       style="margin-left: 5px; float: right"
                       @click="queryRefresh">
                <el-icon>
                    <Refresh/>
                </el-icon>
                刷新
            </el-button>

            <el-config-provider :locale="zhCn">
                <el-pagination
                    v-model:current-page="query.currentPage"
                    :page-size="query.pageSize"
                    small="small"
                    layout="total, prev, pager, next"
                    :total="dataTotalCount"
                    style="float: right"
                    background
                    @current-change="handlePageChange"
                />
            </el-config-provider>
        </div>
    </div>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {constants} from "@/api/constants";
import {codeFormat, moneyFormat} from "@/api/formatter";
import {queryBalance, queryPosition} from "@/api/exchangeApi";

export default {
    name: "PosiList",
    computed: {
        zhCn() {
            return zhCn
        },

        positionData() {
            return this.$store.state.positionData
        },

        balanceData() {
            return moneyFormat(this.$store.state.balance)
        }
    },

    watch: {
        positionData: function (val) {
            this.tableData = val
            this.dataTotalCount = val.length
        },

        balanceData: function (val) {
            this.balance = val
        }
    },

    mounted() {
        this.tableData = this.positionData
        this.balance = this.balanceData
    },

    data() {
        return {
            balance: 0,
            tableData: [],
            dataTotalCount: 2000,
            query: {
                currentPage: 1,
                pageSize: 2
            }
        }
    },
    methods: {

        costFormatter(row, column) {
            return (row.cost / constants.MULTI_FACTOR /
                row.count).toFixed(2)
        },

        montyFormatter(row, column) {
            return moneyFormat(row.cost)
        },

        codeFormatter(row, column) {
            return codeFormat(row.code)
        },

        handlePageChange(val) {
            this.$set(this.query, 'currentPage', val)
        },
        changeTableSort(column) {
            if (column.order === 'descending') {
                this.tableData = this.tableData.sort((a, b) =>
                    b[column.prop] - a[column.prop]
                )
            } else {
                this.tableData = this.tableData.sort((a, b) =>
                    a[column.prop] - b[column.prop]
                )
            }
        },
        queryRefresh() {
            queryBalance()
            queryPosition()
        }
    }
}
</script>

<style scoped>

</style>