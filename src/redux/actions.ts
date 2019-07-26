import { ADD_TODO,INIT_TODOS,UPDATE_TODOS,TO_EDITING } from "./actionTypes";


/*引入 action 根据不同的规则 定义不同的触发改变数据的方法*/

export const addTodo = (payload:any)=>{
    return{
        type:ADD_TODO,
        payload
    }
}

export  const initTodos = (payload:any[])=>{
    return{
        type:INIT_TODOS,
        payload
    }
}

export  const updateTodos = (payload:any)=>{
    return{
        type:UPDATE_TODOS,
        payload
    }
}

export  const toEditing = (payload:any)=>{
    return{
        type:TO_EDITING,
        payload
    }
}
