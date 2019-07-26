import * as React from 'react';
import { Checkbox, Icon} from 'antd';
import { connect } from 'react-redux'
import axios from 'src/config/axios'
import { toEditing,updateTodos } from "../../redux/actions";
import './TodoItem.scss'
import className from 'classnames'


interface ITodoItemProps {
    id: number
    editing: boolean
    description: string
    completed: boolean
    updateTodos: (params: any) => void
    toEditing: (id: number) => void
}

interface ITodoItemState {
    editText:string
}
class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
    constructor(props) {
        super(props)
        this.state = {
            editText:this.props.description
        }
    }

    updateTodos = async (params: any) => {
        try {
            const res = await axios.put(`todos/${this.props.id}`, params)
            this.props.updateTodos(res.data.resource)
        } catch (e) {
            throw new Error(e)
        }
    }

    toEditing = () => {
        this.props.toEditing(this.props.id)
    }

    onKeyUp = (e) => {
        if (e.keyCode === 13 && this.state.editText !== ''){
            this.updateTodos({description:this.state.editText})
        }
    }
    public render() {
        const edit = (
            <div className="editing">
                <input type="text" value={this.state.editText}
                       onChange={e => { this.setState({editText:e.target.value}) }}
                       onKeyUp={this.onKeyUp}
                />
                <div className="iconWrapper">
                    <Icon type="enter" />
                    <Icon type="delete" theme="filled" onClick={() => this.updateTodos({deleted:true})}/>
                </div>
            </div>
        )
        const text = <span className="text"  onDoubleClick={this.toEditing}>{this.props.description}</span>
        const todoItemClass = className({
            TodoItem:true,
            editing:this.props.editing,
            completed:this.props.completed
        })
        return (
            <div className={todoItemClass}>
                <Checkbox checked={this.props.completed} onChange={e => this.updateTodos({completed: e.target.checked})}/>
                {this.props.editing ? edit : text}
            </div>
        )
    }
}

const mapStateToProps = (state,ownprops /*这个参数表示组件自身的props*/)=>({
    todos:state.todos,
    ...ownprops
})

const mapDispatchToProps = {
    toEditing,
    updateTodos
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem)

