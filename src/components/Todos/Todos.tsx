import * as React from 'react';
import TodoInput from './TodoInput'
import axios from 'src/config/axios'
import TodoItem from './TodoItem'
import { connect } from 'react-redux'
import  {initTodos}  from "../../redux/actions/todoActions";
import './Todos.scss'


class Todos extends React.Component<any> {
    constructor(props) {
        super(props)
    }

  get unCompletedTodos(){
      return this.unDeletedTodos.filter( t => !t.completed  )
  }
    get CompletedTodos(){
        return this.unDeletedTodos.filter( t => t.completed  )
    }

  get unDeletedTodos(){
      return this.props.todos.filter( t => !t.deleted  )
  }


    componentDidMount() {
        this.getTodos()
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


    public render() {
        return (
            <div className="Todos">
                <TodoInput />
                <main>
                    {this.unCompletedTodos.map((item) => <TodoItem
                      key={item.id} {...item}/>)}
                    {this.CompletedTodos.map((item) => <TodoItem
                        key={item.id} {...item}/>)}
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state,ownprops /*这个参数表示组件自身的props*/)=>({
    todos:state.todos,
    ...ownprops
})

const mapDispatchToProps = {
    initTodos
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos)
