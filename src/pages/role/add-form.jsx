import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

const Item = Form.Item

class AddForm extends Component {

    static propTypes = {
        setForm:PropTypes.func.isRequired
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }

    
    render() {

        const {getFieldDecorator}=this.props.form
        //formItemLayout是设置格式的
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
          }

        return (            
                <Form>
                    <Item label="角色名称" {...formItemLayout}>
                        {/* getFieldDecorator(id,opation)id必填属性，控件的唯一标识 */}
                        {getFieldDecorator('name', {
                            initialValue: '',
                            rules: [{ required: true, message: '商品名称必须输入!' }],
                        })(<Input placeholder='角色名称' />)}
                    </Item>
                </Form>            
        )
    }
}

export default AddForm=Form.create()(AddForm)


