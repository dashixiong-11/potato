import * as React from 'react'
import './Statistics.scss'
import {connect} from 'react-redux'

interface IStatisticeProps {
    todos: any[]
}

class Statistics extends React.Component<IStatisticeProps> {
    constructor(props) {
        super(props)
    }

    get finishedTodos() {
        console.log(this.props)
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }

    public render() {
        return (
            <div className="Statistics">
                <ul>
                    <li>
                        <div>统计</div>
                    </li>
                    <li>
                        <div>目标</div>
                    </li>
                    <li>
                        <div>番茄历史</div>
                    </li>
                    <li>
                        <div>任务历史</div>
                        <div>累计完成{this.finishedTodos.length}个任务</div>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})
export default connect(mapStateToProps)(Statistics)