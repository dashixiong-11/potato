import { combineReducers } from "redux";
import todos from './todos'

/* combineReducers 函数会合并不同的规则 */
export default combineReducers({todos})