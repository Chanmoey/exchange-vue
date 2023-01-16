<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <el-icon>
                        <Baseball/>
                    </el-icon>
                    银证转账
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card style="width: 100%;" shadow="hover" class="container">
            <el-row style="padding: 0 15%">
                <el-form style="margin-left: 20%" label-width="120px">
                    <el-form-item label="转账方式">
                        <el-select v-model="type">
                            <el-option v-for="item in from.type" :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="选择银行">
                        <el-select v-model="bank">
                            <el-option v-for="item in from.bank" :key="item.id"
                                       :label="item.name"
                                       :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="银行密码">
                        <el-input :type="'password'" v-model="from.password"/>
                    </el-form-item>

                    <el-form-item label="选择币钟">
                        <el-select v-model="bank">
                            <el-option v-for="item in from.bank" :key="item.id"
                                       :label="item.name"
                                       :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="金额">
                        <el-input :type="'number'" v-model="from.money"/>
                    </el-form-item>

                    <el-button style="float: right" type="primary">{{ type === 0 ? '提现' : '转入' }}</el-button>
                </el-form>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Transfer",
    data() {
        return {
            from: {
                type: [
                    {
                        id: 1,
                        name: "银行转证券(转入)"
                    },
                    {
                        id: 0,
                        name: "证券转银行(转出)"
                    }
                ],
                bank: [
                    {
                        id: 0,
                        name: "招商银行"
                    },
                    {
                        id: 1,
                        name: "建设银行"
                    }
                ],
                moneyType: [
                    {
                        id: 0,
                        name: "人民币"
                    },
                    {
                        id: 1,
                        name: "美元"
                    }
                ],
                password: '',
                money: 0
            },
            type: 0,
            bank: "招商银行",
            moneyType: 0
        }
    }
}
</script>

<style scoped>

</style>