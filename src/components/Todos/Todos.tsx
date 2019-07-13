import * as React from 'react';
import TodoInput from './TodoInput'
import axios from 'src/config/axios'
import TodoItem from './TodoItem'

interface ITodoList {
    todos: any[]
}

class Todos extends React.Component<any, ITodoList> {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }

    addTodo = async (params: any) => {
        const {todos} = this.state
        try {
            const res = await axios.post('todos', params)
            this.setState({todos: [res.data.resource, ...todos]})
        } catch (e) {
            throw  new Error(e)
        }
    }

    componentDidMount() {
        this.getTodos()
    }

    toEditing = (id: number) => {
        const {todos} = this.state
       const newTodos = todos.map(t => {
            if (id === t.id) {
                return Object.assign({}, t, {editing: true})
            } else {
                return Object.assign({}, t, {editing: false})
            }
        })
        this.setState({todos:newTodos})
    }


    getTodos = async () => {
        try {
            const res = await axios.get('todos')
            const todos = res.data.resources.map((t) => Object.assign({}, t, {editing: false}))
            this.setState({todos})
        } catch (e) {
            throw new Error(e)
        }
    }

    update = async (id: number, params: any) => {
        const {todos} = this.state
        try {
            const res = await axios.put(`todos/${id}`, params)
            const newTodos = todos.map(t => {
                if (id === t.id) {
                    return res.data.resource
                } else {
                    return t
                }
            })
            this.setState({todos: newTodos})
        } catch (e) {
            throw new Error(e)
        }
    }

    public render() {
        return (
            <div className="Todos">
                <TodoInput addTodo={(params) => {
                    this.addTodo(params)
                }}/>
                <main>
                    {this.state.todos.map((item) => <TodoItem key={item.id} {...item} update={this.update}
                                                              toEditing={this.toEditing}/>)}
                </main>
            </div>
        )
    }
}

export default Todos
