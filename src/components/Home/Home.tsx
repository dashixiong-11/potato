import * as React from 'react';
import {Menu, Dropdown, Icon} from 'antd'
import axios from 'src/config/axios'
import Todos from '../Todos/Todos'
import Tomatoes from '../Tomatoes/Tomatoes'
import Statistics from '../Statistics/Statistics'
import {initTodos} from "../../redux/actions/todoActions";
import {initTomatoes} from "../../redux/actions/tomatoActions";
import {connect} from 'react-redux'
import history from'src/config/hsitory'
import './Home.scss'

/*interface IRouter {
    history: any
    initTodos: (a: any) => void
}*/

interface IIndexdata {
    user: any
}

class Home extends React.Component<any, IIndexdata> {
    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }

    public logout = () => {
        localStorage.setItem('x-token', '')
        history.push('/login')
    }

    async componentWillMount() {
        await this.getMe()
        await this.getTodos()
        await this.getTomatoes()
    }

    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (e) {
            throw new Error(e)
        }
    }
    getTodos = async () => {
        try {
            const res = await axios.get('todos')
            const todos = res.data.resources.map((t) => Object.assign({}, t, {editing: false}))
            this.props.initTodos(todos)
        } catch (e) {
            throw new Error(e)
        }
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
                <Statistics/>
            </div>
        )
    }
}

const mapDispatchToProps = {
    initTodos,
    initTomatoes
}
const mapStateToProps = (state, ownProps) => ({
    ...ownProps
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
