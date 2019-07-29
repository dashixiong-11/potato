import { combineReducers } from "redux";
import todos from './todos'
import tomatoes from './tomatoes'


/* combineReducers 函数会合并不同的规则 */
export default combineReducers({todos,tomatoes})