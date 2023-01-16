<template>
    <div>
        <!--        搜索框-->
        <div class="handle-box">
            <!--            自动提示框-->
            <el-row>
                <el-col :span="4">
                    <CodeInput></CodeInput>
                </el-col>
                <div style="float: left; margin-left: 10px;">
                    <el-date-picker
                        size="small" type="date"
                        placeholder="选择开始日期" value-format="yyyyMMdd"
                        v-model="query.startDate">
                    </el-date-picker>
                    -
                    <el-date-picker
                        size="small" type="date"
                        placeholder="选择结束日期" value-format="yyyyMMdd"
                        v-model="query.endDate">
                    </el-date-picker>
                </div>

                <!--            搜索按钮-->
                <el-button style="float: left; margin-left: 10px"
                           size="small" type="primary"
                           @click="handleSearch">
                    <el-icon style="margin-right: 2px">
                        <Search/>
                    </el-icon>
                    搜索
                </el-button>
            </el-row>
        </div>

        <!--        历史委托查询结果-->
        <el-table
            :data="tableData.slice(
                    (query.currentPage - 1) * query.pageSize,
                    query.currentPage * query.pageSize
                )"
            border
            @sort-change="changeTableSort"
        >
            <el-table-column prop="date" label="委托日期" align="center"
                             sortable :sort-orders="['ascending', 'descending']"/>
            <el-table-column prop="time" label="委托时间" align="center"/>
            <el-table-column prop="code" label="股票代码" align="center"/>
            <el-table-column prop="name" label="名称" align="center"/>
            <el-table-column prop="price" label="委托价格" align="center"/>
            <el-table-column prop="amount" label="委托数量" align="center"/>
            <el-table-column prop="status" label="状态" align="center"/>
        </el-table>

        <div class="pagination">
            <el-config-provider :locale="zhCn">
                <el-pagination
                    v-model:current-page="query.currentPage"
                    :page-size="query.pageSize"
                    small="small"
                    layout="total, prev, pager, next"
                    :total="pageTotal"
                    style="float: right"
                    background
                    @current-change="handlePageChange"
                />
            </el-config-provider>
        </div>
    </div>
</template>

<script>
import CodeInput from "@/components/CodeInput.vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default {
    name: "HisOrderList",
    components: {
        CodeInput
    },
    computed: {
        zhCn() {
            return zhCn
        }
    },
    data() {
        return {
            tableData: [
                {
                    date: '20200105',
                    time: '14:00:01',
                    code: 600000,
                    name: '浦发银行',
                    price: 10,
                    amount: 100,
                    status: 1
                },
                {
                    date: '20200101',
                    time: '14:00:02',
                    code: 600000,
                    name: '浦发银行',
                    price: 11,
                    amount: 100,
                    status: 1
                },
                {
                    date: '20200103',
                    time: '14:00:03',
                    code: 600000,
                    name: '浦发银行',
                    price: 12,
                    amount: 100,
                    status: 1
                },
                {
                    date: '20200111',
                    time: '14:00:04',
                    code: 600000,
                    name: '浦发银行',
                    price: 13,
                    amount: 100,
                    status: 1
                },
            ],
            query: {
                currentPage: 1, // 当前页码
                pageSize: 3, // 每页的数据条数,
                code: '',
                startDate: '',
                endDate: '',
            },
            pageTotal: 4,
        }
    },
    methods: {
        updateSelectedCode(item) {
            this.query.code = item.code
        },
        handleSearch() {

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
        }
    },
    created() {
        this.$bus.on("code-input-selected", this.updateSelectedCode)
    },
    beforeUnmount() {
        this.$bus.off("code-input-selected", this.updateSelectedCode)
    }
}
</script>

<style scoped>

</style>