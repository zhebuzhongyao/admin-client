import React,{Component} from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
const Item=Form.Item


 class Addupdate extends Component{

    static propTypes={
        setForm:PropTypes.func.isRequired,
        categoryName:PropTypes.string//修改的時候取得值
      }


      componentWillMount () {
        this.props.setForm(this.props.form)
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props//修改值
        // console.log(categoryName)
        
        return(
            <Form>
                <Item>
                {getFieldDecorator('categoryName', {
                    initialValue:categoryName || "",//修改有值則顯示，無值則為空字符串
                    rules: [{required:true, message: '分类名称必须输入' }],
                })(
                    <Input type='text' placeholder='请输入分类名称'/>
                )}
                </Item>    
            </Form>
        
        )
        
            
        
    }
}


export default Form.create()(Addupdate)
