import React, { Component } from 'react'
import {Card,Table,Icon,Button,Select,Input} from 'antd'
import Linkbutton from '../../components/link-button/link-button'
import {reqproducts} from '../../api/index'

export default class ProductHome extends Component {

          //初始化状态
          state={
            products:[],//商品列表为空
            total:0//商品总数为0
          }



          initColumns=()=>{
             this.columns = [
              {
                title: '商品名称',
                dataIndex: 'name',
                
              },
              {
                title: '商品描述',
                dataIndex: 'desc',
                
              },
              {
                  title: '价格',
                  dataIndex: 'price',
                  render:(price)=>'￥'+price
                  
                },
                {
                  title: '状态',
                  dataIndex: 'status',//看文档，status=1代表下架和在售，status=2代表上架和已下架
                  render:(status)=>{
                      let btntxt1='下架'//不能用const声明，因为下边要进行赋值操作，const定义之后不能再次赋值
                      let btntxt2='在售'
                      if(status===2){
                          btntxt1='上架'
                          btntxt2='已下架'
                      }
                      return(
                          <span>
                              <button>{btntxt1}</button>
                              <span>{btntxt2}</span>
                          </span>
                      )    
                  }                
                },
                {
                  title: '操作',
                  width:'100px',
                  dataIndex: 'detail',
                  render:(product)=> 
                  <span>
                       <Linkbutton>详情</Linkbutton>
                      <Linkbutton>修改</Linkbutton>
                  </span>
                                
                },
            ];
          }

      getProducts=async(pageNum)=>{
        const result = await reqproducts(pageNum,2)
        console.log(result) 
        if(result.status===0){
          const {total,list}=result.data   
          console.log(total,list) 
          //更新状态
          this.setState({
            products:list,
            total
          })
        }
      }
      


    componentWillMount(){
      this.initColumns()
    }
    compontentDidMount(){
      this.getProducts(1)//获取第一页显示
    }

    // search=()=>{

    // }




    render() {

     const {products,total} = this.state
     console.log(products,total)
            
          const title=(
              <span>
                  <Select value='2'>
                    <option value="1">按商品搜索</option>
                    <option value="2">按描述搜索</option>
                  </Select>
                  <Input type="text" style={{width:'200px',margin:'0 10px'}} placeholder='请输入内容' />
                  <Button type='primary' onClick={this.search}>搜索</Button>
              </span>
          )




        return (
            <Card title={title} extra={<Button type='primary'><Icon type='plus'/>添加商品</Button>} style={{ width: '100%' }}>
                <Table
                    columns={this.columns}                  
                    dataSource={products}
                    rowKey="_id"//为了不让控制台报错
                    bordered
                    pagination={{
                        total,
                        defaultPageSize:2,
                        showQuickJumper: true
                    }} //分页配置项
                />
            </Card>
        )
    }
}
