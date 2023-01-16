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
                                 sortable :sort-orders="['ascending', 'descending']"/>

                <el-table-column align="center" prop="name" label="名称"/>

                <el-table-column align="center" prop="count" label="股票数量"/>

                <el-table-column align="center" prop="cost" label="总投入"/>

                <el-table-column align="center" prop="" label="成本"/>
            </el-table>
        </el-row>
        <div class="pagination">
            <el-button size="small" round type="primary"
                       style="margin-left: 5px; float: right"
                       @click="">
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

export default {
    name: "PosiList",
    computed: {
        zhCn() {
            return zhCn
        }
    },
    data() {
        return {
            balance: 0,
            tableData: [
                {code: '600025', name: '华能水电', count: 100, cost: 20},
                {code: '600000', name: '浦发银行', count: 100, cost: 20},
                {code: '600001', name: '平安银行', count: 100, cost: 20},
                {code: '600886', name: '国投电力', count: 100, cost: 20}
            ],
            dataTotalCount: 2000,
            query: {
                currentPage: 1,
                pageSize: 2
            }
        }
    },
    methods: {

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
        }
    }
}
</script>

<style scoped>

</style>