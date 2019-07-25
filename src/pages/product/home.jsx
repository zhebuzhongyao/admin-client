import React, { Component } from 'react'
import {Card,Table,Icon,Button,Select,Input,message} from 'antd'
import Linkbutton from '../../components/link-button/link-button'
import {reqproducts,reqSearchproducts,reqUpdateStatus} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constants'
import memoryutils from '../../utils/memoryutils'


const Option=Select.Option

export default class ProductHome extends Component {

          //初始化状态
          state={
            products:[],//商品列表为空
            total:0,//商品总数为0
            searchType:'productName',//默认按照商品名称搜索
            searchName:''
          }



          updatestatus=async(productId,status)=>{
            console.log(1)
            //计算更新后的值
            status=status===1?2:1;
            //请求更新
            const result=await reqUpdateStatus(productId,status)
            console.log(result)
            if(result.status===0){
              message.success('更新商品状态成功')
              //获取当前页显示
              this.getProducts(this.pageNum)//需要把pageNum缓存在this上这里才能用
            }
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
                  // dataIndex: 'status',//看文档，status=1代表下架和在售，status=2代表上架和已下架
                  render:({_id,status})=>{
                      let btntxt1='下架'//不能用const声明，因为下边要进行赋值操作，const定义之后不能再次赋值
                      let btntxt2='在售'
                      if(status===2){
                          btntxt1='上架'
                          btntxt2='已下架'
                      }

                      
                      return(
                          <span>
                              <button onClick={()=>{this.updatestatus(_id,status)}}>{btntxt1}</button>
                              <span>{btntxt2}</span>
                          </span>
                      )    
                  }                
                },
                {
                  title: '操作',
                  width:'100px',
                  // dataIndex: 'detail',
                  render:(product)=>  
                  <span>
                       <Linkbutton onClick={()=>{
                         memoryutils.product=product//在内存中保存product
                         console.log(product)
                         this.props.history.push('/product/detail')
                       }
                        }>详情</Linkbutton>
                      <Linkbutton onClick={()=>{
                        memoryutils.product=product
                        this.props.history.push('/product/addupdate')}}>修改</Linkbutton> 
                  </span>
                   
                                
                },
            ];
          }

          


      getProducts=async(pageNum)=>{
        this.pageNum=pageNum//pageNum是个局部变量，需要放在公共的上面，让外边看到
        const {searchName,searchType}=this.state
        let result
        if(!searchName){
          console.log(111)
           result = await reqproducts(pageNum,PAGE_SIZE)
        }else{
           result = await reqSearchproducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
           console.log(result)
        }
         
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
    componentDidMount(){
      this.getProducts(1)//获取第一页显示
    }

    // search=()=>{

    // }




    render() {

     const {products,total,searchName,searchType} = this.state
     console.log(products,total)
            
          const title=(
              <span>
                  <Select 
                    value={searchType} 
                    onChange={(value)=>this.setState({searchType:value})}
                  >
                    <Option value="productName">按商品搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                  </Select>
                  <Input 
                    type="text" 
                    style={{width:'200px',margin:'0 10px'}} 
                    placeholder='请输入内容' 
                    value={searchName}
                    onChange={(event)=>{this.setState({searchName:event.target.value})}}
                  />
                  <Button type='primary' onClick={()=>{this.getProducts(1)}}>搜索</Button>
              </span>
          )




        return (
            <Card title={title} extra={<Button type='primary' onClick={()=>{this.props.history.push('/product/addupdate')}}><Icon type='plus'/>添加商品</Button>} style={{ width: '100%' }}>
                <Table
                    columns={this.columns}                  
                    dataSource={products}
                    rowKey="_id"//为了不让控制台报错
                    bordered
                    pagination={{
                        total,
                        defaultPageSize:PAGE_SIZE,
                        showQuickJumper: true,
                        onChange:this.getProducts,//改变页码的监听用onChange，参数是个函数，而且需要时回调函数，因为点击采取执行
                        current:this.pageNum//当前页数
                      }} //分页配置项
                />
            </Card>
        )
    }
}
