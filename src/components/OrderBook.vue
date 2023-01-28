<template>
    <!--订单簿窗口-->
    <el-form label-width="80px">
        <!-- 行情时间-->
        <el-form-item>
            <h4 style="color:#909399">
                行情时间:{{ quotesTime }}
            </h4>
        </el-form-item>
        <!--五档行情-->
        <el-form-item>
            <!--卖-->
            <div class="orderBook">
                <el-row v-for="item in sell" :key="item.name">
                    <!--档位名称-->
                    <el-col :span="6">{{ item.name }}</el-col>
                    <!--价格-->
                    <el-col :span="6">{{ item.price | filterEmpty }}</el-col>
                    <!--长度-->
                    <el-col :span="6">
                        <div class="volume-ratio">
                            <div class="sell" v-bind:style="
                                    {width: item.width+'%'}"
                            />
                        </div>
                    </el-col>
                    <!--量-->
                    <el-col :span="6">
                        {{ item.volume | filterEmpty }}
                    </el-col>
                </el-row>
            </div>
            <!--买-->
            <div class="orderBook">
                <el-row v-for="item in buy" :key="item.name">
                    <!--档位名称-->
                    <el-col :span="6">{{ item.name }}</el-col>
                    <!--价格-->
                    <el-col :span="6">{{ item.price | filterEmpty }}</el-col>
                    <!--长度-->
                    <el-col :span="6">
                        <div class="volume-ratio">
                            <div class="buy" v-bind:style="{width: item.width+'%'}"
                            />
                        </div>
                    </el-col>
                    <!--量-->
                    <el-col :span="6">
                        {{ item.volume | filterEmpty }}
                    </el-col>
                </el-row>
            </div>

        </el-form-item>
    </el-form>
</template>

<script>

import {constants} from "@/api/constants";

export default {
    name: "OrderBook",
    filters: {
        filterEmpty(value) {
            if (value === -1) {
                return '-'
            } else {
                return value
            }
        }
    },
    data() {
        return {
            quotesTime: '--:--:--',
            quotesTimestamp: 0,
            sell: [
                {
                    name: "卖五",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
                {
                    name: "卖四",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
                {
                    name: "卖三",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
                {
                    name: "卖二",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
                {
                    name: "卖一",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
            ],
            buy: [
                {
                    name: "买一",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
                {
                    name: "买二",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
                {
                    name: "买三",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
                {
                    name: "买四",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
                {
                    name: "买五",
                    price: -1,
                    volume: -1,
                    width: 1,
                },
            ],
        }
    },
    created() {
        this.$bus.on("code-input-selected", this.startL1Sub);
    },
    beforeUnmount() {
        this.$bus.off("code-input-selected", this.startL1Sub);
    },
    methods: {
        startL1Sub(item) {
            let code = item.code
            // let _vm = this;
            // this.resetData(true)
            //
            // _vm.intervalId = setInterval(() => {
            //     _vm.$eventBus.send("l1-market-data",
            //         {},
            //         {
            //             code: code,
            //         },
            //         (err, reply) => {
            //             if (err) {
            //                 console.log("subscribe " + item.code + " l1 market data fail", err)
            //             } else {
            //                 let l1MarketData = JSON.parse(reply.body);
            //
            //                 if (l1MarketData === null) {
            //                     return
            //                 }
            //
            //                 if (code !== l1MarketData.code) {
            //                     console.error("wrong code quotation, code = " + code +
            //                         ", recv code = " + l1MarketData.constructor)
            //
            //                 }
            //
            //                 if (l1MarketData.timestamp < _vm.quotesTimestamp) {
            //                     return
            //                 }
            //
            //                 this.resetData(false)
            //
            //                 let buyPrices = l1MarketData.buyPrices
            //                 let buyVolumes = l1MarketData.buyVolumes
            //                 let maxBuyVolume = -1;
            //
            //                 for (let i = 0; i < buyPrices.length; i++) {
            //                     _vm.buy[i].price = (buyPrices[i] / constants.MULTI_FACTOR).toFixed(2)
            //                     _vm.buy[i].volume = buyVolumes[i]
            //                     if (buyVolumes[i] > maxBuyVolume) {
            //                         maxBuyVolume = buyVolumes[i]
            //                     }
            //                 }
            //
            //                 for (let i = 0; i < buyVolumes.length; i++) {
            //                     if (maxBuyVolume !== 0) {
            //                         _vm.buy[i].width = Math.floor(buyVolumes[i] / maxBuyVolume * 100)
            //                     } else {
            //                         _vm.buy[i].width = 1
            //                     }
            //                 }
            //
            //                 let sellPrices = l1MarketData.sellPrices;
            //                 let sellVolumes = l1MarketData.sellVolumes;
            //                 let maxSellVolume = -1;
            //                 for (let i = 0; i < sellPrices.length; i++) {
            //                     _vm.sell[4 - i].price = (sellPrices[i] / constants.MULTI_FACTOR).toFixed(2);
            //                     _vm.sell[4 - i].volume = sellVolumes[i];
            //                     if (sellVolumes[i] > maxSellVolume) {
            //                         maxSellVolume = sellVolumes[i];
            //                     }
            //                 }
            //                 for (let i = 0; i < sellVolumes.length; i++) {
            //                     if (maxSellVolume !== 0) {
            //                         _vm.sell[4 - i].width = Math.floor(sellVolumes[i] / maxSellVolume * 100);
            //                     } else {
            //                         _vm.sell[4 - i].width = 1;
            //                     }
            //                 }
            //             }
            //         }
            //     )
            // }, 1000)
        },
        //重置订单簿, 传入参数：是否保留定时任务
        resetData(isClearInterval) {
            this.quotesTime = '--:--:--';
            this.quotesTimestamp = 0;

            //清空原来数据
            this.buy.forEach(t => {
                t.price = -1;
                t.volume = -1;
                t.width = 1;
            });

            this.sell.forEach(t => {
                t.price = -1;
                t.volume = -1;
                t.width = 1;
            });

            if (this.intervalId !== -1 && isClearInterval) {
                clearInterval(this.intervalId);
                this.intervalId = -1;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.orderBook {
    border: 1px solid #909399;;
    margin-left: 5%;
    margin-right: 5%;

    .el-row {
        .el-col {
            height: 35px;
            line-height: 35px;
        }
    }

    .volume-ratio {
        margin: 10px auto;
        border: none;

        .sell {
            height: 10px;
            background: #67C23A;
        }

        .buy {
            height: 10px;
            background: #F56C6C;
        }
    }
}

</style>