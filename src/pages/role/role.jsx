import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'
import {Card, Table,Button,Modal,message} from 'antd';
import {reqaddRole,reqRoleList} from '../../api/index'
import Linkbutton from '../../components/link-button/link-button';
import {formateDate} from '../../utils/dateUtils'
import AddForm from './add-form'
import UpdateAdd from './update-form'

export default class Role extends Component {

    state={
        roles:[],
        isShowAdd:false,//是否显示添加用户界面
        isShowAuth:false//是否显示设置权限界面
    }


    initcolumns=()=>{
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',//必须和接口文档的名字一致
            },
            {
                title: '创建时间',                
                dataIndex: 'create_time',
                render:(create_time)=>{return formateDate(create_time)}//箭头函数，{}不省略需加return
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:auth_time => formateDate(auth_time)//箭头函数，当两边都只有一条语句时，(){}可以省略
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
            {
                title: '操作',
                render:role => <Linkbutton onClick={()=>this.isShowAuth(role)}>设置权限</Linkbutton>
            },
        ];
    }


    isShowAuth=(role)=>{
        this.role=role
        console.log(this.role)  
        this.setState({
            isShowAuth:true
        })
    }

    //发送请求获取角色列表
    getRoleList=async()=>{
        const result =await reqRoleList()
        
        if(result.status===0){
            const roles=result.data
             console.log(roles)
            this.setState({
                roles
            })

        }
    }

    //创建角色的回调
    addrole=()=>{
        //validateFields校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        this.form.validateFields(async(error,values)=>{
            // console.log(this.form)
            if(!error){
                this.setState({
                    isShowAdd:false
                })

                const {name}=values
                this.form.resetFields()
                console.log(values)

                const result = await reqaddRole(name)
                console.log(result)
                if(result.status===0){           
                    this.getRoleList()
                    message.success('添加角色成功')
                }else{
                    message.error(result.msg)
                }
            }
        })
        
        
        
    }


    componentWillMount(){   
        this.initcolumns()
    }

    componentDidMount(){
        this.getRoleList()
    }

    render() {
        const {roles,isShowAdd,isShowAuth} = this.state
        const role = this.role||{}
        const title=(
            <Button 
                type='primary'
                onClick={()=>this.setState({isShowAdd:true})}
            >
                创建角色
            </Button>
        )


        return (
            <Card title={title}>
                <Table
                    columns={this.columns}
                    dataSource={roles}
                    bordered
                    pagination={{ defaultPageSize: 3, showQuickJumper: true }} //分页配置项
                />,  
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addrole}
                    onCancel={() =>{
                        this.setState({isShowAdd:false})//点击取消时，让对话框隐藏
                        this.form.resetFields()
                        }
                    }
                >
                    <AddForm setForm={(form)=>this.form=form} />
                </Modal> 
                
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => 
                        this.setState({isShowAuth:false})
                    }
                    >

                    <UpdateAdd role={role} />
                </Modal>          
            </Card>
            
        )
    }
}

