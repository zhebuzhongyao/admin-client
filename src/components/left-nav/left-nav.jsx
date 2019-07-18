import React, { Component } from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './left-nav.less';
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;


class Leftnav extends Component {

    

    getMenulistNodes2=(menuList)=>{
        
        //请求的路径
        const path=this.props.location.pathname

        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push(
                    <Menu.Item key={item.key}> 
                         <NavLink to={item.key}>
                            <Icon type={item.icon} />
                           <span>{item.title}</span>
                         </NavLink>                       
                     </Menu.Item>
                )
            }else{
                const citem=item.children.find(citem=>citem.key===path)
                if(citem){
                    this.openkey=item.key
                }

                

                pre.push(
                    <SubMenu key={item.key}
                    title={
                    <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </span>
                    }
                >
                    {
                       this.getMenulistNodes2(item.children) 
                    }
                </SubMenu>
                )               
            }
            return pre
        },[])
    }

    //根据menu数组生成Menu.Item和SubMenu的数组
    // map+函数递归
//     getMenulistNodes=(menuList)=>{
//         return menuList.map(item=>{
//             if(!item.children){
//                 return (
//                     <Menu.Item key={item.key}> 
//                         <Link to={item.key}>
//                             <Icon type={item.icon} />
//                             <span>{item.title}</span>
//                         </Link>                       
//                     </Menu.Item> 
//                 )
//             }
//             return ( 
//                 <SubMenu key={item.key}
//                 title={
//                 <span>
//                     <Icon type={item.icon} />
//                     <span>{item.title}</span>
//                 </span>
//                 }
//             >
//                 {
//                     this.getMenulistNodes(item.children)
//                 }
//             </SubMenu>
//          )
//     })
// }
        
    componentWillMount(){
        this.menunodes=this.getMenulistNodes2(menuList)
    }


    render() {
        
        //得到当前请求的路径
        const selectedKeys=this.props.location.pathname
        return (
            <div className='left-nav'>
                <NavLink className='nav-link'>
                    <img src={logo} alt="图片加载失败"/>
                   <h1>硅谷后台</h1>
                </NavLink> 

                 <Menu
                    // 默认选中其中一个
                    //selectedKeys:总是根据最新指定的key进行显示，登录后会默认选中home
                    selectedKeys={[selectedKeys]}//defaultSelectedKeys:指定默认值后，通过编码更新为其他值，没有编码的效果
                    defaultOpenKeys={[this.openkey]}
                    mode="inline"//指收缩方式
                    theme="dark"//指主题颜色
                    
                    >
                        {
                            // this.getMenulistNodes(menuList)
                            this.menunodes
                        }


                    
                    {/* <Menu.Item key="/home"> */}
                        {/* 因为点击首页会跳转，说明是一个路由链接，所以要用link包着 */}
                        {/* <Link to='/home'>
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>                       
                    </Menu.Item> */}

                    {/* 商品的key可以任意定义，因为点击商品不跳转路由，只展开 */}
                    {/* <SubMenu key="sub1"
                     title={
                        <span>
                            <Icon type="appstore" />
                            <span>商品</span>
                        </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <Icon type="bars" />
                                <span>品类管理</span>
                            </Link>                           
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to='/product'>
                                <Icon type="tool" />
                                <span>商品管理</span>
                            </Link>                            
                        </Menu.Item>
                    </SubMenu> */}
                   
                    </Menu>                        
                </div>          
        )
    }
}

export default withRouter(Leftnav)
