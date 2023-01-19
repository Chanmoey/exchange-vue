<template>
    <div class="header">
        <div class="collapse-btn" @click="collapseChange">
            <el-icon v-if="collapse">
                <Fold/>
            </el-icon>
            <el-icon v-else>
                <Expand/>
            </el-icon>
        </div>
        <div class="logo">Exchange</div>
        <div class="header-right">
            <div class="header-user-con">
                <el-dropdown @command="handleCommand" class="user-name" trigger="click">
                <span class="el-dropdown-link">
                  {{ username }}
                  <el-icon class="el-icon--right">
                    <arrow-down/>
                  </el-icon>
                </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import {getRequest} from "@/api/axiosCommon";
import router from "@/router";

export default {
    name: "Header",
    computed: {
        username() {
            let acc = sessionStorage.getItem("uid")
            console.log(sessionStorage.getItem("uid"))
            return acc ? acc : "guest"
        }
    },
    data() {
        return {
            collapse: true
        }
    },
    methods: {
        collapseChange() {
            this.collapse = !this.collapse
            this.$bus.emit('collapse', this.collapse)
        },
        handleCommand(command) {
            if (command === "logout") {
                getRequest("/login/logout").then(resp => {
                    if (resp) {
                        sessionStorage.removeItem("uid")
                        sessionStorage.removeItem("token")
                        router.replace("/")
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}

.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}

.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-bell .el-icon-bell {
    color: #fff;
}

.user-name {
    margin-left: 10px;
}

.user-avator {
    margin-left: 20px;
}

.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>