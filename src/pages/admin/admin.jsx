import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {Layout} from 'antd'
import Leftnav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import User from '../user/user'
import Role from '../role/role'
import Home from '../home/home'
import Product from '../product/product'
import Charts from '../charts/charts'
import Category from '../category/category'
// import storageutils from '../../utils/storageutils'
import memoryutils from '../../utils/memoryutils'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    render(){


        //获取保存的user，如果不存在，返回login页面
        //const user=JSON.parse(localStorage.getItem('userkey')||'{}');
        
        //const user=storageutils.getUser()
        const user=memoryutils.user
        // console.log(user._id)
        if(!user._id){
            //console.log(1)
            return <Redirect to='/login'/>
        }



        return(
            <Layout style={{height:'100%'}}>
                <Sider>
                    <Leftnav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{background:'white',margin:'20px'}}>
                        <Switch>
                            <Route path='/home' component={Home}/> 
                            <Route path='/product' component={Product}/> 
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/charts' component={Charts}/>
                            <Route path='/category' component={Category}/>                           
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'rgba(0,0,0,0.5)'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}