import axios from "axios"
import {ElMessage} from 'element-plus'

axios.interceptors.response.use(success => {
    if (success.headers.get("Authorization")) {
        sessionStorage.setItem("token", success.headers.get("Authorization"))
    }
    // http响应码为200来到这，但是200不代表业务处理成功
    if (success.status && success.status === 200 && success.data.code !== 0) {
        ElMessage.error({message: success.data.message})
        return
    }
    return success.data
}, error => {
    if (error.response.headers.get("Authorization")) {
        sessionStorage.setItem("token", error.response.headers.get("Authorization"))
    }
    if (error.response.data.message) {
        ElMessage.error({message: error.response.data.message})
    } else {
        ElMessage.error({message: "未知错误"})
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
            'Authorization': sessionStorage.getItem('token')
        }
    });
}

export const postRequest = (url, params) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        data: params,
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: "put",
        url: `${base}${url}`,
        data: params,
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: "get",
        url: `${base}${url}`,
        data: params,
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}

export const deleteRequest = (url, params) => {
    return axios({
        method: "delete",
        url: `${base}${url}`,
        data: params,
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}