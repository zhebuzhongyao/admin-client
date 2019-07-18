import React, { Component } from 'react'
import {Card,Icon,Table,Button,message,Modal} from 'antd'
import LinkButton from '../../components/link-button/link-button'
import {reqcategorys,addcategory,updatecategory} from '../../api'
import Addupdate from './add-update'


export default class Category extends Component {

  //初始化状态
  state = {
    categorys: [],//列表初始值为空
    loading: false,
    showstatus: 0//0:隐藏；1：添加；2：修改
  }

  //点击确定的回调
  handleOk = () => {
    //进行表单验证
    this.form.validateFields(async (err, values) => {
      this.form.resetFields()//重置輸入數據（初始值）
      if (!err) {
        //验证通过后得到输入数据
        const { categoryName } = values

        const {showstatus} = this.state
        // console.log(categoryName)
        //判斷是添加還是修改
        let result//现在外部定义result，因为在里边定义的话会形成块级作用域，不能用const定义，因为后面要重新赋值
        if(showstatus===1){
          //发送添加分类的请求
          result = await addcategory(categoryName)
        }else{
          
          const categoryId=this.category._id
          console.log(categoryId)
          //发送修改分类的请求
          result = await updatecategory({categoryId,categoryName})
        }
        
        console.log(result)
        this.setState({ showstatus: 0 })

        const action=showstatus===1?'添加':'修改'
        //根据响应结果，做不同的处理
        if (result) {
          //重新获取分类列表
          this.getCategorys()
          message.success(action+'成功')
        } else {
          message.error(action+'分类失败')
        }
      }
    })
  }

  //点击取消的回调
  handleCancel = () => {
    this.form.resetFields()//取消也需要重置
    this.setState({ showstatus: 0 })
  }


  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',

      },
      {
        title: '操作',
        width: 300,
        render: (category) => <LinkButton onClick={() => {
          // console.log(category)
          this.category = category ;
          this.setState({showstatus: 2 })
        }}>修改分类</LinkButton>,
      },
    ];
  }

  
    // 保存当前分类, 其它地方都可以读取到
    

  getCategorys = async () => {
    //请求数据之前更新loading
    this.setState({ loading: true })
    const result = await reqcategorys()
    //不管请求成功还是失败都隐藏loading
    this.setState({ loading: false })
    // console.log(result)
    if (result.status === 0) {
      //获取分类列表
      const categorys = result.data
      //更新状态
      this.setState({
        categorys,
      })
    } else {
      message.error('获取分类列表失败')
    }
  } 


  //在render之前，没必要每次render都渲染一次，所以写在willmount里面
  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {

    const { categorys, loading, showstatus } = this.state//读取状态
    //讀取更新的分類名稱
    const category=this.category || {}

    return (
      <Card extra={<Button type='primary' onClick={() => { this.setState({ showstatus: 1 }) }}><Icon type='plus' />添加</Button>} style={{ width: '100%' }}>
        <Table
          columns={this.columns}
          loading={loading}
          rowKey="_id"//为了不让控制台报错
          dataSource={categorys}
          bordered
          pagination={{ defaultPageSize: 6, showQuickJumper: true }} //分页配置项
        />
        <Modal
          title={showstatus === 1 ? '添加分类' : '修改分类'}
          visible={showstatus !== 0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 将子组件传过来的form对象保存到当前组件对象中，这样就可以用子组件身上的属性，做表单验证等 */}
          <Addupdate setForm={form => this.form = form} categoryName={category.name} />
        </Modal>
      </Card>
    )
  }
}
