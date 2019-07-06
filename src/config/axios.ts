import axios from 'axios';
/*import { createBrowserHistory } from 'history'*/

const appID = "GsAQKbf6FSq9Tb6sEeogbuiY"
const appSecret = "jvCf4DxqiE2dwjoHpGQoxikh"
/*const history  = createBrowserHistory()*/

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    const xToken = localStorage.getItem('x-token')
    if(xToken){
        config.headers.Authorization = `Bearer ${xToken}`
    }
    return config;
},  (error) => {
    console.error(error)
    return Promise.reject(error);
});

// Add a response interceptor
// tslint:disable-next-line:only-arrow-functions
instance.interceptors.response.use((response) => {
    // Do something with response data
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
    }
    return response;
}, (error) => {
    if(error.response.status === 401){
        window.location.href = '/login'
        console.error('获取用户失败')
    }
    // Do something with response error
    return Promise.reject(error);
});

export default instance