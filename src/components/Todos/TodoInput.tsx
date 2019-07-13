import * as React from 'react';
import {Icon, Input} from 'antd';

interface IInputState {
    description:string
}
interface IINputProps {
    addTodo: (params: any) => void
}

class TodoInput extends React.Component<IINputProps ,IInputState>{
    constructor(props){
        super(props)
        this.state={
            description:''
        }
    }
    addTodo = ()=>{
        if( this.state.description !== ''){
            this.props.addTodo({description:this.state.description})
            this.setState({description:''})
        }
    }
    public render(){
        const {description} = this.state
        const suffix = description? <Icon type="enter" onClick={this.addTodo}/> : <span/>
        return(
            <div className="TodoInput">
                <Input
                    placeholder="添加新任务"
                    suffix={suffix}
                    value={description}
                    onChange={ (e) => { this.setState({ description:e.target.value }) }}
                    onPressEnter={  this.addTodo  }
                />
            </div>
        )
    }
}

export default TodoInput
