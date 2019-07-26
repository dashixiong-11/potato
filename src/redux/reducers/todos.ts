import {ADD_TODO,INIT_TODOS,UPDATE_TODOS,TO_EDITING} from "../actionTypes";

/*  定义规则  不同的action生成不同的state */
export default (state:any[]=[],action:any):any => {
    switch (action.type) {
        case ADD_TODO:
            return [...state,...action.payload]
        case INIT_TODOS:
            return [...action.payload]
        case UPDATE_TODOS:
            return state.map(t=>{
                if(t.id === action.payload.id){
                    return action.payload
                }else{
                    return t
                }
            })
        case TO_EDITING:
              return  state.map(t=>{
                if(t.id === action.payload){
                    return Object.assign({},t,{editing:true})
                }else {
                    return Object.assign({},t,{editing:false})
                }
            })
        default:
            return state
    }
}