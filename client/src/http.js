import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from './router'

let loading;
function startLoading() {
    loading = Loading.service({
        lock: true,
        fullscreen: true,
        text: '拼命加载中',
        background: 'rgba(0,0,0,0.7)'
    });
}
function endLoading() {
    loading.close()
}
// 请求拦截
axios.interceptors.request.use(req => {
    startLoading();
    if(localStorage.getItem('token')) {
        // 设置统一的header
        req.headers.Authorization = localStorage.getItem('token');
    }
    return req;
}, err => {
    return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use(res => {
    endLoading();
    return res;
}, err => {
    endLoading();
    Message.error(err.response.data);
    // 获取错误状态码
    const { status } = err.response;
    // 401代表当前token已经失效
    if(status == 401) {
        Message.error('token失效，请重新登录');
        // 清除token
        localStorage.removeItem('token');
        router.push('./login');
    }
    return Promise.reject(err)
})

export default axios;