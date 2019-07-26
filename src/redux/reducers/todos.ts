import {ADD_TODO} from "../actionTypes";

/*  定义规则  不同的action生成不同的state */
export default (state=[],action:any):any => {
    switch (action.type) {
        case ADD_TODO:
            return [...state,...action.payload]
        default:
            return state
    }
}