import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Card, Icon, Form, Input, Select, Button,message } from 'antd'
import Linkbutton from '../../components/link-button/link-button'
import { reqcategorys,reqAddUpdateProduct } from '../../api/index'
import memoryutils from '../../utils/memoryutils'
import PicturesWall from './pictruewalls'
import RichTextEditor from './rich-text-editor'
const Item = Form.Item
const Option = Select.Option

class ProductAddUpdate extends Component {

    static propTypes={
        imgs:propTypes.array,
        detail:propTypes.string
    }

    state = {
        categorys: []
    }

    constructor(props){
        super(props)
        //创建一个ref容器
        this.pwRef=React.createRef()
        this.detailRef=React.createRef()
    }

    // 提交按钮的处理
    handleSubmit = (event) => {
        event.preventDefault()//阻止按钮默认事件
        //进行表单的统一验证
        this.props.form.validateFields(async(err,values)=>{
            if(!err){
                //收集商品名称，描述，价格，分类
                const {name,desc,price,categoryId}=values
                console.log(name,desc,price,categoryId)
                //收集图片
                const imgs=this.pwRef.current.getImgs()
                console.log(imgs)
                //收集文本框中的文字
                const detail=this.detailRef.current.getDetail()
                console.log(detail)

                //封装一个product对象
                const product={name,desc,price,categoryId,imgs,detail}
                if(this.isUpdate){
                   product._id =this.product._id
                }
               

                //发请求添加或修改
                const result = await reqAddUpdateProduct(product)
                //这个地方拿不到product，所以要封装一个product对象
                console.log(result,product)//undefined
                if(result.status===0){
                    message.success(`${this.isUpdate?'添加':'修改'}商品成功`)
                }else{
                    message.error(result.msg)
                }
            }
        })
    }

    //自定义表单校验
    validatePrice=(rule,value,callback)=>{
        if(value===''){
            callback()
        }else if(value<=0){
            callback('价格必须大于0')
        }else{
            callback()
        }
    }

    //发送请求拿到categorys里面的_id和name,后面select框需要动态获取这些数据
    getCategorys=async()=>{
        const result = await reqcategorys()
        if(result.status===0){
            const categorys=result.data
            this.setState({categorys})
        }
    }


    componentWillMount=()=>{
        this.product=memoryutils.product
        console.log(this.product)
        this.isUpdate=!!this.product._id//id一定是有的，所以两次取反，isUpdate的值应该是true

        
    }

    componentDidMount=()=>{
        this.getCategorys()
    }

    render() {
        const { categorys } = this.state
        const { getFieldDecorator } = this.props.form;
        const {isUpdate,product}=this
        console.log(isUpdate,product)

        //card的头部样式
        const title = (
            <span>
                <Linkbutton onClick={() => { this.props.history.goBack() }}>
                    <Icon type='arrow-left' />
                </Linkbutton>
                <span>{ isUpdate ? '修改商品' : '添加商品' }</span>
            </span>
        )

        //设置form的样式
        const formLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 }
        }

        return (
            <Card title={title}>
                <Form  {...formLayout} onSubmit={this.handleSubmit}>
                    <Item label="商品名称">
                        {getFieldDecorator('name', {
                            initialValue: '',
                            rules: [{ required: true, message: '商品名称必须输入!' }],
                        })(<Input placeholder='商品名称' />)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                            initialValue: '',
                            rules: [{ required: true, message: '商品描述必填!' }],
                        })(<Input placeholder='商品描述' />)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '商品价格必填!' },
                                {validator:this.validatePrice}//validator是form表单中的自定义校验
                            ],
                        })(<Input type='number' placeholder='商品价格' addonAfter='元' />)}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                            initialValue: product.categoryId || '',
                            rules: [
                                { required: true, message: '请选择商品分类!' },       
                        ],
                        })(
                            <Select>
                                <Option value="">未选择</Option>
                                {
                                    categorys.map(citem => <Option key={citem._id} value={citem._id}>{citem.name}</Option>)
                                }
                            </Select>,
                        )}
                    </Item>
                    <Item label="商品图片">
                          <PicturesWall ref={this.pwRef} imgs={product.imgs} />     
                    </Item>
                    <Item label="商品详情" wrapperCol={{span: 20}}>
                        <RichTextEditor ref={this.detailRef} detail={product.detail} />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                        {/* 要确定这个button是一个提交类型的按钮 htmlType="submit"，然后给它绑定事件监听函数*/}
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate)