import * as React from 'react';
import {Menu, Dropdown, Icon} from 'antd'
import axios from 'src/config/axios'
import Todos from '../Todos/Todos'
import Tomatoes from '../Tomatoes/Tomatoes'
import './Home.scss'

interface IRouter {
    history: any
}

interface IIndexdata {
    user: any
}

class Home extends React.Component<IRouter, IIndexdata> {
    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }

    public logout = () => {
        localStorage.setItem('x-token', '')
        this.props.history.push('/login')
    }

    async componentWillMount() {
        await this.getMe()
    }

    getMe = async () => {
        const response = await axios.get('me')
        this.setState({user: response.data})
    }
    handleMenuClick = e => {
        if (e.key === '2') {
            this.logout()
        }
    };


    public render() {
        const downmenu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item>
                    <Icon type="user"/>
                    个人设置</Menu.Item>
                <Menu.Item onClick={this.logout}>
                    <Icon type="logout"/>
                    注销</Menu.Item>
            </Menu>
        );
        return (
            <div className="Home">
                <div className="header">
                    <div className="logo">LOGO</div>
                    <Dropdown overlay={downmenu}>
                        <a className="ant-dropdown-link" href="#">
                            {this.state.user.account}
                            <Icon type="down"/>
                        </a>
                    </Dropdown>
                </div>
                <div className="main">
                    <Tomatoes/>
                    <Todos/>
                </div>
            </div>
        )
    }
}

export default Home
