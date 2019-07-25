
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form,Tree,Input } from 'antd';
import menuList from '../../config/menuConfig'

const { TreeNode } = Tree;
const Item=Form.Item


export default class UpdateAdd extends Component {

    static propTypes={
        role:PropTypes.object
    }

    // constructor(props){
    //     super(props)
    //     const {menus} = this.props.role
    //     this.setState({
    //         checkedKeys:menus 
    //     })
    // }  
    
    state = {
      checkedKeys:[]
    }


    //   getTreeNodes=(meunList)=>{
    //       return  meunList.reduce((pre,item)=>{
    //         return pre
    //       },[])
    // }


      componentWillMount(){
        this.treeNode=this.renderTreeNodes(menuList)
        // 根据传入角色的menus 来更新checkedKeys
        const menus=this.props.role.menus
        console.log(this.props.role)
        this.setState({
          checkedKeys:menus
        })
      }
    
      
    //通过menuList得到树形结构的名称
      renderTreeNodes = meunList =>
      meunList.map(item => {
          if (item.children) {
            return (
              <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} />;
        });

        onCheck = checkedKeys => {
          console.log('onCheck', checkedKeys);
          this.setState({ checkedKeys });
        };
    
    render() {
        const {role} = this.props
        const {checkedKeys} = this.state

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
          }

    
        return (
            <div>
                <Form {...formItemLayout}>
                    <Item label="角色名称">
                    {/* value是拿到角色名称显示在输入框中 */}
                        <Input type="text" value={role.name}/>
                    </Item>
                </Form>
                {/* 树形控件 */}
                <Tree
                    checkable//节点前添加 Checkbox 复选框
                    defaultExpandAll//默认展开当前选中的节点
                    onCheck={this.onCheck}//点击复选框触发
                    checkedKeys={checkedKeys}//（受控）选中复选框的树节点
                   
                >
                    <TreeNode title='平台权限' key='all'>
                        {this.treeNode}
                    </TreeNode>    
                </Tree>
            </div>
            
        )
        
    }
}