import React,{Component} from 'react'
import logo from './images/logo.png'
import './login.less'
import {Icon,Input,Button,Form} from 'antd';

const Item=Form.Item;

export default class Login extends Component{


    handleSubmit=(e)=>{
        e.preventDefault();
        alert('发送请求')
    }
    render(){
        return(
            <div className='login'>
               <div className='login-header'>
                   <img src={logo} alt="图片加载失败"/>
                    <h1>后台管理系统</h1>
               </div>
               <div className='login-content'>
                    <h1>用户登陆</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">

                        <Item>
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />                       
                        </Item>

                        <Item>
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />                  
                        </Item>

                        <Item>          
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        </Item>
                    </Form>
               </div>
            </div>
        )
    }
}
