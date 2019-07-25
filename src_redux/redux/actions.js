import { INCREMENT, DECREMENT } from "./action-types";

//创建增加的action
export const increment=(number)=>({type:INCREMENT,number})//type是一个标识，

//创建减少的action
export const decrement=(number)=>({type:DECREMENT,number})
