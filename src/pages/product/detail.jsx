import React,{Component} from 'react'
import {Card,Icon,List} from 'antd'
import Linkbutton from '../../components/link-button/link-button'
import './detail.less'
import memoryutils from '../../utils/memoryutils'
import {Redirect} from 'react-router-dom'



const Item=List.Item

export default class ProductDetail extends Component{

    render(){
        const product=memoryutils.product
        console.log(product)
        if(!product||!product._id){
            return <Redirect to='/product'/>
        }
        const title=(
            <span>
                <Linkbutton onClick={()=>{this.props.history.goBack()}}>
                    <Icon type='arrow-left'/>
                </Linkbutton>
                <span>商品详情</span>
            </span>
        )
        return(
            <Card title={title} className='card'>
                <List>
                    <Item>
                        <span className='card-left'>商品名称：</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className='card-left'>商品描述：</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className='card-left'>商品价格：</span>
                        <span>{product.price+'元'}</span>
                    </Item>
                    <Item>
                        <span className='card-left'>所属分类：</span>
                        <span>{product.categoryId}</span>
                    </Item>
                    <Item>
                        <span className='card-left'>商品图片：</span>
                        <span>
                            {/* <img src='' alt='图片加载失败' /> */}
                        </span>
                    </Item>
                    <Item>
                        <span className='card-left'>商品详情：</span>
                        <div dangerouslySetInnerHTML={{__html:product.detail}}></div>
                        {/* dangerouslySetInnerHTML是react里的API，里面传的是个对象{__html:''} */}
                    </Item>
                </List>
            </Card>
        )
    }
}