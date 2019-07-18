
//封装一个能发ajax请求的函数


import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'


// 添加一个请求的拦截器
//为了处理post的参数，将json形式转化为urlencoded的形式
axios.interceptors.request.use(function (config) {
    //console.log(config)config是个对象，身上有medthod,data,url,headers等属性
    const {method,data}=config;
    if(method==='post'&&typeof data==='object'){
        config.data=qs.stringify(data)
        // console.log(data)
    }
    return config;
  });


  // 添加一个响应拦截器
  //为了处理数据和错误信息
axios.interceptors.response.use(function (response) {
  console.log(response.data)
    return response.data;

  
  }, function (error) {
    message.error('请求出错'+error.message);
    return new Promise(()=>{});
  });
  


  export default axios


