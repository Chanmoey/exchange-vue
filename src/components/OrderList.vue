<template>
    <div>
        <el-table
            :data="tableData.slice(
                    (query.currentPage - 1) * query.pageSize,
                    query.currentPage * query.pageSize
                )"
            border
            @sort-change="changeTableSort"
            :default-sort="{prop: 'time', order:'descending'}"
        >
            <el-table-column align="center" prop="time" label="委托时间"
                             sortable :sort-orders="['ascending', 'descending']"/>

            <el-table-column align="center" prop="code" label="股票代码"/>

            <el-table-column align="center" prop="name" label="名称"/>

            <el-table-column align="center" prop="price" label="委托价格"/>

            <el-table-column align="center" prop="amount" label="委托数量"/>

            <el-table-column align="center" prop="direction" label="方向"/>

            <el-table-column align="center" prop="status" label="状态"/>
        </el-table>
        <div class="pagination">
            <el-button size="small" round type="primary"
                       style="margin-left: 5px; float: right"
                       icon="el-icon-refresh"
                       @click="">刷新
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
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default {
    name: "OrderList",
    computed: {
        zhCn() {
            return zhCn
        }
    },
    data() {
        return {
            balance: 0,
            tableData: [
                {
                    time: '09:40:01', code: '600025', name: '华能水电', price: 100,
                    amount: 10, direction: '买入', status: 3
                },
                {
                    time: '09:40:02', code: '600025', name: '华能水电', price: 100,
                    amount: 10, direction: '买入', status: 3
                },
                {
                    time: '09:40:03', code: '600025', name: '华能水电', price: 100,
                    amount: 10, direction: '买入', status: 3
                },
                {
                    time: '09:40:04', code: '600025', name: '华能水电', price: 100,
                    amount: 10, direction: '买入', status: 3
                },
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
                this.tableData = this.tableData.sort((a, b) => {
                        if (b[column.prop] > a[column.prop]) {
                            return 1;
                        } else if (b[column.prop] === a[column.prop]) {
                            return 0
                        } else {
                            return -1;
                        }
                    }
                )
            } else {
                this.tableData = this.tableData.sort((a, b) => {
                        if (b[column.prop] > a[column.prop]) {
                            return -1;
                        } else if (b[column.prop] === a[column.prop]) {
                            return 0
                        } else {
                            return 1;
                        }
                    }
                )
            }
        }
    }
}
</script>

<style scoped>

</style>