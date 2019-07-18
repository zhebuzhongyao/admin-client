import React from 'react'

import './link-button.less'

// 自定义的看似是链接的button组件
// {...props}将接收的所有属性传给了子标签
// children标签属性：有值时有三种情况{
//     1、字符串
//     2、标签对象
//     3、标签对象的数组
// }

export default function Linkbutton(props){
    return <button className='link-button' {...props}/>}