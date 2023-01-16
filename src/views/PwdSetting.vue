<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item class="top-class">
                <span><el-icon style="margin-right: 5px; margin-top: 5px"><Setting/></el-icon></span>
                <text>修改密码</text>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-card style="margin-top: 10px;" shadow="hover" class="container">
            <el-row style="padding: 0 15%"></el-row>
            <el-form style="width: 60%; margin-left: 20%">
                <el-form-item label="旧密码" label-width="80px">
                    <el-input v-model="from.oldPassword" type="password"></el-input>
                </el-form-item>

                <el-form-item label="新密码" label-width="80px">
                    <el-input v-model="from.newPassword" type="password"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" label-width="80px">
                    <el-input v-model="from.newPasswordCfm" type="password"></el-input>
                </el-form-item>
                <el-button style="float: right" type="primary">确认修改</el-button>
            </el-form>

        </el-card>
    </div>
</template>

<script>
export default {
    name: "PwdSetting",
    data() {
        return {
            from: {
                oldPassword: '',
                newPassword: '',
                newPasswordCfm: ''
            }
        }
    }
}
</script>

<style scoped>
.top-class {
    display: flex; /*父元素设置flex属性*/
    justify-content: center; /*水平主轴居中*/
    align-items: center; /*垂直交叉轴居中*/
}
</style>