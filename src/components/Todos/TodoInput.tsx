import * as React from 'react';
import {Icon, Input} from 'antd';
import { connect } from 'react-redux'
import axios from 'src/config/axios'
import { addTodo } from "../../redux/actions/todoActions";

interface IInputState {
    description:string
}
interface IInputProps {
    addTodo: (payload: any) => any
}

class TodoInput extends React.Component<IInputProps ,IInputState>{
    constructor(props){
        super(props)
        this.state={
            description:''
        }
    }
    postTodo = async ()=>{
        try {
            const response = await axios.post('todos',{description:this.state.description})
            this.props.addTodo(response.data.resource)
            console.log(this.props)
        }catch (e) {
            throw  new Error(e)
        }
            this.setState({description:''})
    }
    public render(){
        const {description} = this.state
        const suffix = description? <Icon type="enter" onClick={this.postTodo}/> : <span/>
        return(
            <div className="TodoInput">
                <Input
                    placeholder="添加新任务"
                    suffix={suffix}
                    value={description}
                    onChange={ (e) => { this.setState({ description:e.target.value }) }}
                    onPressEnter={  this.postTodo  }
                />
            </div>
        )
    }
}

const mapStateToProps = (state,ownprops /*这个参数表示组件自身的props*/)=> ( { todos:state.todos, ...ownprops })

const mapDispatchToProps = {
    addTodo
    /*
    addTodo = (payload)=>({ type:'ADD_TODO',payload})
    */
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoInput)

