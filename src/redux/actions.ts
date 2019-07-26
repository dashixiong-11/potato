import { ADD_TODO } from "./actionTypes";


/*引入 action 根据不同的规则 定义不同的触发改变数据的方法*/

export const addTodo = (payload:any)=>{
    return{
        type:ADD_TODO,
        payload
    }
}