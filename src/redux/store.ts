import { createStore } from 'redux';
import rootReducer from './reducers'

/*  拿到定义好的规则 创建有规则的仓库 */

const store = createStore(rootReducer)

export default store