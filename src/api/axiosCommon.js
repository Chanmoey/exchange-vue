import axios from "axios"
import {ElMessage} from 'element-plus'
import router from "@/router"

axios.interceptors.response.use(success => {
    // http响应码为200来到这，但是200不代表业务处理成功
    if (success.status && success.status === 200 && success.data.code !== 0) {
        ElMessage.error({message: success.data.message})
        return
    }
    return success.data
}, error => {
    if (error.response.status === 504 || error.response.status === 404) {
        ElMessage.error({message: "找不到服务器资源"})
    } else if (error.response.status === 403) {
        ElMessage.error({message: "权限不足，请联系管理员"})
    } else if (error.response.status === 401) {
        ElMessage.error({message: "尚未登录，请登录"})
        router.replace('/')
    } else {
        if (error.response.data.message) {
            ElMessage.error({message: error.response.data.message})
        } else {
            ElMessage.error({message: "未知错误"})
        }
    }
})

let base = 'http://localhost:8090'

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': sessionStorage.getItem('token')
        }
    });
}

export const postRequest = (url, params) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        data: params,
        headers: {
            'token': sessionStorage.getItem('token')
        }
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: "put",
        url: `${base}${url}`,
        data: params,
        headers: {
            'token': sessionStorage.getItem('token')
        }
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: "get",
        url: `${base}${url}`,
        data: params,
        headers: {
            'token': sessionStorage.getItem('token')
        }
    })
}

export const deleteRequest = (url, params) => {
    return axios({
        method: "delete",
        url: `${base}${url}`,
        data: params,
        headers: {
            'token': sessionStorage.getItem('token')
        }
    })
}