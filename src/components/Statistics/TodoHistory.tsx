import * as React from 'react'
import './TodoHistory.scss'
import {connect} from 'react-redux'
import _ from 'lodash'
import {format} from 'date-fns'
import { Tabs } from 'antd'

interface ITodoHistoryProps {
    todos:any[]
}

const TabPane = Tabs.TabPane
const TodoItem = (props) => {
    return (
        <div className="todoItem">
            <span className="time">{format(props.updated_at,'HH:mm')}</span>
            <span className="description">{props.description}</span>
        </div>
    )
}
class TodoHistory extends React.Component<ITodoHistoryProps> {
    constructor(props) {
        super(props)
    }
    get finishedTodos(){
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }
    get deletedTodos(){
        return this.props.todos.filter( t => t.deleted)
    }
    get dailyDeletedTodos(){
        return _.groupBy(this.deletedTodos,(todos)=>{
            return format(todos.updated_at,'YYYY-MM-D')
        })
    }
    get dailyFinishedTodos(){
        return _.groupBy(this.finishedTodos,(todos)=>{
            return format(todos.updated_at,'YYYY-MM-D')
        })
    }
    get deletedDates(){
        return Object.keys(this.dailyDeletedTodos).sort((a,b) =>   Date.parse(b) - Date.parse(a) )
    }
    get finishedDates(){
        return Object.keys(this.dailyFinishedTodos).sort((a,b) =>   Date.parse(b) - Date.parse(a) )
    }

    public render() {
        const finishedTodoList = this.finishedDates.map(date => {
                return (
                    <div key={date} className="dailyTodos">
                        <div className="summary">
                            <p className="date">
                                <span> {date}</span>
                                <span>周五</span>
                            </p>
                            <p className="finishedCount"> 完成了{ this.dailyFinishedTodos[date].length }个任务 </p>
                        </div>
                        <div className="todolist">
                            {
                                this.dailyFinishedTodos[date].map(todo => <TodoItem key={todo.id} {...todo}/>)
                            }
                        </div>
                    </div>
                )
            })
        const deletedTodoList = this.deletedDates.map(date => {
            return (
                <div key={date}>
                    <div>
                        {date}
                        删除了{ this.dailyDeletedTodos[date].length }个任务
                    </div>
                    <div>
                        {
                            this.dailyDeletedTodos[date].map(todo => <TodoItem key={todo.id} {...todo}/>)
                        }
                    </div>
                </div>
            )
        })
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="已完成任务" key="1">
                    <div className="TodoHistory">
                        { finishedTodoList }
                    </div>
                </TabPane>
                <TabPane tab="已删除任务" key="2">
                    <div className="TodoHistory">
                        { deletedTodoList }
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(TodoHistory)