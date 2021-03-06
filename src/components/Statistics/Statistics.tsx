import * as React from 'react'
import './Statistics.scss'
import {connect} from 'react-redux'
import Polygon from './Polygon'
import _ from 'lodash'
import {format} from 'date-fns'
import TodoHistory from './TodoHistory'


interface IStatisticeProps {
    todos: any[]
}

class Statistics extends React.Component<IStatisticeProps> {
    constructor(props) {
        super(props)
    }

    get afinishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }

    get dailyTodos(){
        const obj = _.groupBy(this.afinishedTodos,(t)=>{
            return format(t.updated_at,'YYYY-MM-D')
        })
        return obj
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
                        <div>累计完成{this.afinishedTodos.length}个任务</div>
                        <Polygon data={this.dailyTodos} totalFinishedCount={this.afinishedTodos.length}/>
                    </li>
                </ul>
                <TodoHistory/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})
export default connect(mapStateToProps)(Statistics)