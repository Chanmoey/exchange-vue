<template>
    <div class="orderForm">
        <el-form label-width="80px">
            <el-form-item>
                <h3 :style="direction === 0 ? 'color: #F56C6C' : 'color: #67C23A'"
                    style="width: 20%; margin-left: 40%">
                    {{ direction === 0 ? '买入' : '卖出' }}股票
                </h3>
            </el-form-item>

            <el-form-item label="证券代码">
                <CodeInput></CodeInput>
            </el-form-item>

            <el-form-item label="证券名称">
                <el-input readonly v-model="name"></el-input>
            </el-form-item>

            <el-form-item :label="'可' + (direction === 0 ? '买' : '卖') + '(股)'">
                <el-input readonly v-model="affordCount"></el-input>
            </el-form-item>

            <el-form-item label="价格">
                <el-input-number v-model="price"
                                 @change="changePrice"
                                 controls-position="right"
                                 :step="0.01"
                                 :min="0.01"/>
            </el-form-item>

            <el-form-item :label="(direction === 0 ? '买入' : '卖出') + '(股)'">
                <el-input-number
                    v-model="volume"
                    controls-position="right"
                    :step="0.01"
                    :max="affordCount"
                    :min="0"/>
            </el-form-item>

            <el-form-item style="float:right">
                <el-button @click="sendOrder" :type="direction === 0 ? 'danger' : 'success'">
                    {{ direction === 0 ? '买入' : '卖出' }}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import CodeInput from "@/components/CodeInput.vue";
import {postRequest} from "@/api/axiosCommon";
import {constants} from "@/api/constants";
import {queryBalance, queryOrder, queryPosition} from "@/api/exchangeApi";

export default {
    name: "OrderWidget",

    components: {
        CodeInput
    },

    props: {
        direction: {type: Number, required: true}
    },

    data() {
        return {
            name: '',
            affordCount: undefined,
            price: undefined,
            volume: undefined,
            code: ''
        }
    },
    methods: {
        changePrice() {
            // 卖，看有多少持仓
            if (this.direction === constants.SELL) {
                let posiArr = this.$store.state.positionData;
                for (let i = 0; i < posiArr.length; i++) {
                    this.affordCount = posiArr[i].count;
                }
            } else {
                // 买，根据价格和资金计算能买多少
                this.affordCount = parseInt(
                    ((this.$store.state.balance / constants.MULTI_FACTOR) / this.price) + ''
                )
            }
        },

        updateSelectedCode(item) {
            this.code = item.code
            this.name = item.name
            this.price = undefined
            this.volume = undefined
        },

        sendOrder() {
            let order = {
                type: constants.NEW_ORDER,
                timestamp: new Date().getTime(),
                code: this.code,
                direction: this.direction,
                price: this.price * constants.MULTI_FACTOR,
                volume: this.volume,
                orderType: constants.LIMIT
            }
            postRequest("/api/send-order", order).then(resp => {
                if (resp) {
                    this.$message.success("委托已送往交易所")
                    queryOrder()
                    queryBalance()
                    queryPosition()
                } else {
                    this.$message.error("委托失败")
                }
            })
        }
    },
    created() {
        this.$bus.on("code-input-selected", this.updateSelectedCode)
    },
    unmounted() {
        this.$bus.off("code-input-selected", this.updateSelectedCode)
    }
}
</script>

<style lang="scss">

.orderForm {
    input {
        text-align: center;
    }

    .el-input-number {
        width: 100%;
    }
}

</style>