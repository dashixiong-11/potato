import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './redux/store'
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

/* Provider 包住 APP， 并且把 创建好的store 传入到 APP下的子组件中 */
ReactDOM.render(
    <Provider  store={store}>
        <App />
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

