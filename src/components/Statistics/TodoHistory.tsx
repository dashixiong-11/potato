import * as React from 'react'
import './TodoHistory.scss'
import {connect} from 'react-redux'
import _ from 'lodash'
import {format} from 'date-fns'

interface ITodoHistoryProps {
    todos:any[]
}

const TodoItem = (props) => {
    return (
        <div>
            <span>{props.updated_at}</span>
            <span>{props.description}</span>
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
    get dailyFinishedTodos(){
        return _.groupBy(this.finishedTodos,(todos)=>{
            return format(todos.updated_at,'YYYY-MM-D')
        })
    }
    get dates(){
        return Object.keys(this.dailyFinishedTodos).sort((a,b) =>   Date.parse(b) - Date.parse(a) )
    }

    public render() {
        const todoList = this.dates.map(date => {
                return (
                    <div key={date}>
                        <div>
                            {date}
                            完成了{ this.dailyFinishedTodos[date].length }个任务
                        </div>
                        <div>
                            {
                                this.dailyFinishedTodos[date].map(todo => <TodoItem key={todo.id} {...todo}/>)
                            }
                        </div>
                    </div>
                )

            })
        return (
            <div className="TodoHistory">
                { todoList }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(TodoHistory)