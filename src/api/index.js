//包含应用中所有请求接口的函数：接口请求函数

//本质封装的是axios


import ajax from './ajax'
// import { url } from 'inspector';
import jsonp from 'jsonp'
import {message} from 'antd'


// const BASE=''


//定义一个请求登录的函数
export const reqLogin=(username,password)=>ajax.post('/login', {username,password})
// console.log(reqLogin)



  // ajax({
  //   method: 'post',
  //   url: '/login',//用配置代理，解决跨域问题
  //   data: {
  //     username: 'username',
  //     password: 'password'
  //   }
  //   // data:qs.stringify({username,password})
  // })




// export function reqLogin(username,password){
//     return ajax({
//         method: 'post',
//         url: '/login',//用配置代理，解决跨域问题
//         data: {
//           username: 'username',
//           password: 'password'
//         }
//         // data:qs.stringify({username,password})
//       })
//}

// const name='admin'
// const pwd='admin'

// reqLogin(name,pwd)
//     .then(result=>{
//         //const result=response
//         //console.log(response)  
//         console.log(result,'请求成功了')})


//发送jsonp 请求得到天气信息
export const reqWeather =(city)=>{

  return new Promise((resolve,reject)=>{
   
    const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // console.log(url)
    jsonp(url,{},(error,data)=>{

  if (!error && data.error===0) { 
          // console.log(1)
          const {dayPictureUrl,weather}=data.results[0].weather_data[0];
          // console.log(dayPictureUrl,weather)          
          resolve({dayPictureUrl,weather})         
        }else{//失败的
        message.error('获取信息失败')
      }
    })
  })  
}


// 发送get请求得到商品分类列表
export const reqcategorys=()=>ajax('/manage/category/list')

//添加商品的接口
export const addcategory=(categoryName)=>ajax({
  method: 'post',
  url: '/manage/category/add',
  data: {
    categoryName:categoryName
  }
});


//修改商品信息
export const updatecategory=({categoryId,categoryName})=>ajax.post('/manage/category/update',{categoryId:categoryId,categoryName:categoryName});



//获取商品分页列表
export const reqproducts=(pageNum,pageSize)=>ajax('/manage/product/list',{
  params:{
    pageNum,
    pageSize
  }
})
console.log(reqproducts)



        
