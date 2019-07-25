import React,{Component} from 'react'
import {increment,decrement} from './redux/actions'


export default class App extends Component{

    increment=()=>{
        //需要拿到下拉框里的值
        const number=this.refs.selectnum.value*1
        // console.log(number)
        //更新状态，分发同步action
        this.props.store.dispatch(increment(number)) 
        // console.log(this.props)       
    }

    decrement=()=>{
        const number=this.refs.selectnum.value*1
        this.props.store.dispatch(decrement(number))
    }

    incrementIfOdd=()=>{
        const number=this.refs.selectnum.value*1
        const count=this.props.store.getState()
        if(count%2===1){
            this.props.store.dispatch(increment(number))
        }
    }


    incrementAsync=()=>{
        const number=this.refs.selectnum.value*1
        setTimeout(() => {
            this.props.store.dispatch(increment(number))
        }, 1000);
    }





    render(){
        const count = this.props.store.getState()
        // console.log(this.props.store)
        return(
            <div>
                <p>click {count} times</p>
                <select ref='selectnum'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementAsync}>increment anysc</button>
            </div>
        )
    }
}

