import * as React from 'react';
import { Checkbox, Icon} from 'antd';


interface ITodoItemProps {
    id: number
    editing: boolean
    description: string
    completed: boolean
    update: (id: number, params: any) => void
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

    update = (params: any) => {
        this.props.update(this.props.id, params)
    }

    toEditing = () => {
        this.props.toEditing(this.props.id)
    }

    onKeyUp = (e) => {
        if (e.keyCode === 13 && this.state.editText !== ''){
            this.update({description:this.state.editText})
        }
    }
    public render() {
        const edit = (
            <div>
                <input type="text" value={this.state.editText}
                       onChange={e => { this.setState({editText:e.target.value}) }}
                       onKeyUp={this.onKeyUp}
                />
                <div className="iconWrapper">
                    <Icon type="enter" />
                    <Icon type="delete" theme="filled" onClick={() => this.update({deleted:true})}/>
                </div>
            </div>
        )
        const text = <span onDoubleClick={this.toEditing}>{this.props.description}</span>
        return (
            <div className="Todoitem">
                <Checkbox checked={this.props.completed} onChange={e => this.update({completed: e.target.checked})}/>
                {this.props.editing ? edit : text}
            </div>
        )
    }
}

export default TodoItem
