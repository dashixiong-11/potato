import * as React from 'react'
import TomatoAction from './TomatoAction'
import axios from 'src/config/axios'
import {connect} from 'react-redux'
import {initTomatoes, addTomato} from "../../redux/actions/tomatoActions";
import './Tomatoes.scss'
    interface ITomatoProps {
        addTomato:(payload:any) => void
        tomatoes:any[]
    }
class Tomatoes extends React.Component<ITomatoProps> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getTomatoes()
    }

    get unFinishTomato(){
        return this.props.tomatoes.filter(t =>   !t.description && !t.ender_at)[0]
    }

    getTomatoes = async ()=>{
        try {
            const response = await axios.get('tomatoes')
            console.log(response.data)
        }catch (e) {
            throw new Error(e)
        }
    }
    startTomato = async () => {
        try {
            const response = await axios.post('tomatoes',{duration:1500000})
            this.props.addTomato(response.data.resource)
            console.log(response.data)
        }catch (e) {
            throw new Error(e)
        }
    }
    public render() {
        return (
            <div className="Tomatoes">
                <TomatoAction startTomato={this.startTomato} unfinishtomato={this.unFinishTomato}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownprops /*这个参数表示组件自身的props*/) => ({
    tomatoes: state.tomatoes,
    ...ownprops
})

const mapDispatchToProps = {
    initTomatoes,
    addTomato
}
export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes)