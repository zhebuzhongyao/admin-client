import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import logo from './images/logo.png'
import './login.less'
import {Icon,Input,Button,Form,message} from 'antd';
import {reqLogin} from '../../api'
 import storageutils from '../../utils/storageutils'
import memoryutils from '../../utils/memoryutils'


const Item=Form.Item;

class Login extends Component{


    handleSubmit=(e)=>{
        e.preventDefault();
        // alert('发送请求')
        // console.log(1)

        // 对表单进行统一验证
        this.props.form.validateFields(async(err,{username,password})=>{
            // console.log(1)
            const result=await reqLogin(username,password)
            console.log(result)
            if(!err){                             
                if(result.status===0){
                    //将user的信息保存到local中
                    const user=result.data;
                    //localStorage.setItem('userkey',JSON.stringify(user))//setitem里面穿的是字符串，所以要把user用JSON方法转化为字符串形式
                    storageutils.saveUser(user)

                    // 将本地的信息保存到内存里
                    memoryutils.user=user
                    // console.log(user)
                    //跳转到管理界面
                    this.props.history.replace('/admin')
                    message.success('登录成功！')
                }
                //alert(`发送请求,username=${value.username},password=${value.password}`)
            else{
                // alert('验证失败')
                message.error(result.msg)
                // console.log(1)
            }   }
        })   
    }



    //对密码进行自定义验证
    validatepwd=(rule,value,callback)=>{
        // 1).必须输入
        // 2).必须大于等于4位
        // 3).必须小于等于12位
        // 4).必须是英文、数字或下划线组成
        value=value.trim();
        if(!value){
            callback('密码必须输入')
        }else if(value.length<4){
            callback('密码不能小于4位')
        }else if(value.length>12){
            callback('密码不能大于12位')
        }else if(!/^[a-zA-z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线')
        }else{
            callback();
        }
    }

   

    
   
    

    render(){

        //获取已经保存的用户信息，如果用户存在，说明用户已经登录了，则跳转到管理界面
        //const user=JSON.parse(localStorage.getItem('userkey')||'{}')
        //const user=storageutils.getUser()
        const user=memoryutils.user
        // console.log(user)
        // console.log(user._id)
        if(user._id){
           return <Redirect to='/admin'/>
        }




        const {getFieldDecorator}=this.props.form;
        //console.log(this.props)//this.props上会多一个form属性，是一个对象，对象里面有很多方法，包括getFieldDecorator
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
                        {getFieldDecorator('username', {
                            initialValue:'',
                            rules: [
                            {required: true, whitespace:true,message: '用户名不能为空!' },
                            {min:4,message:'用户名不能小于4位'},
                            {max:12,message:'用户名必须小于等于12位'},
                            {pattern:/^[a-zA-z0-9_]+$/,message:'用户名必须是英文、数字或下划线'}
                        ]})(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder="用户名" />
                        )}                       
                        </Item>

                        <Item>
                        {getFieldDecorator('password', {
                            initialValue:'',//设置初始值为空，要不然.trim的时候value会报错，是undefined
                            rules: [
                                {validator:this.validatepwd}
                            ]})(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"/>
                        )}                 
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

const WrapperForm=Form.create()(Login);
export default WrapperForm;
