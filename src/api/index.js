import axios from "axios";
import fetchRequest from "./fetch.js";
import { getCookie } from '@/utils/cookie';

const baseUrl = '/api/youli';
const request = axios.create({
    baseURL: baseUrl
});

// 全局请求拦截器
request.interceptors.request.use(config => {
    const token = getCookie('Token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 全局响应拦截器
request.interceptors.response.use(res => {
    return res.data;
}, error => {
    return Promise.reject(error);
});

// -- fetch方式
export const adminLogin = (data) => {
    return fetchRequest('/admin/login', {
        method: 'post',
        body: data
    })
}

// 分页获取商品列表信息
// export const goodsListPage = (data) => {
//     return fetchRequest(`/product/pages?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`, {
//         method: 'post'
//     })
// }
export const goodsListPage = (data) => {
    return request({
        url: `/product/pages?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`,
        method: 'post',
        data
    })
}

export const ordersListPage = (data) => {
    return fetchRequest(`/order/pages?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`, {
        method: 'post',
        body: data
    })
}