import * as React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login/Login'
import Index from './components/Index/Index'
import SignUp from './components/SignUp/SignUp'


class App extends React.Component {
  public render() {
    return (
        <Router>
            <div>
                <Route exact={true} path="/" component={Index} />
                <Route  path="/login" component={Login} />
                <Route  path="/signUp" component={SignUp} />
            </div>
        </Router>
    );
  }
}

export default App;
