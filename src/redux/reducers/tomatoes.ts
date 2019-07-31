import {ADD_TOMATO,INIT_TOMATOES,UPDATE_TOMATOES} from '../actionTypes'

export default (state:any[]=[],action) => {
    switch (action.type) {
        case ADD_TOMATO:
            console.log(action.payload,state)
            return [action.payload,...state]
        case INIT_TOMATOES:
            return [...action.payload]
        case UPDATE_TOMATOES:
            return state.map(t=>{
                if(t.id === action.payload.id){
                    return action.payload
                }else{
                    return t
                }
            })
        default:
            return state
    }
}