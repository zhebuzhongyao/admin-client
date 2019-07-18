import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './header.less'
import { Modal } from 'antd';
import memoryutils from '../../utils/memoryutils'
import storageutils from '../../utils/storageutils'
import Linkbutton from '../link-button/link-button'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api/index'



 class Header extends Component {

    //获取当前时间初始值
    state={
        currenttime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }



    

    //定义一个退出登录的函数
    logout=()=>{
        // console.log(this);
        const that=this;//缓存this，因为里面的this需要用到props，也可以把里面的函数改为箭头函数
        //引用antd里面confirm的方法
        Modal.confirm({
            title: '确认退出吗？',           
            onOk(){            
              //清除数据,local中的和内存中的
                storageutils.removeUser()
                memoryutils.user={}
              //跳转到login页面            
              that.props.history.replace('/login');//这个地方只有改变this是不行的，history会未定义，是因为Header不是一个路由组件，只有路由组件才会有history，location，match三个属性，所以要用withRouter在外层包装，把Header包装成路由组件，withRouter是个高阶组件。
            },
            onCancel(){
              console.log('Cancel');
            },
          });
    }

    //获取天气信息
    gerWeather=async()=>{
        const {dayPictureUrl,weather}=await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }


    


    //开启一个定时器，让时间动起来
    componentDidMount(){
        this.intervalid=setInterval(() => {
            //更新时间，利用formateDate更改时间格式
            this.setState({
                currenttime:formateDate(Date.now())
            })
        }, 1000);

        this.gerWeather()
    }
    //清除定时器
    componentWillMount(){
        clearInterval(this.intervalid)
    }


    render() {
        const {currenttime,dayPictureUrl,weather}=this.state

        const user=memoryutils.user;//动态获取用户名

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{user.username}</span>
                    {/* 组件的标签体作为标签的children属性传入，children：'退出' ，本质是Linkbutton是个组件，每个组件身上都会有props这个属性，所以是把props传给了button*/}
                    <Linkbutton onClick={this.logout}>退出</Linkbutton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                        <span>商品管理</span>
                        
                    </div>
                    <div className='header-bottom-right'>
                        <span>{currenttime}</span>
                        <img src={dayPictureUrl} alt="图片加载失败"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Header)
