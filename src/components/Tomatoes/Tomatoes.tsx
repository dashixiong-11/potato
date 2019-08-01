import * as React from 'react'
import TomatoAction from './TomatoAction'
import TomatoList from './TomatoList'
import axios from 'src/config/axios'
import {connect} from 'react-redux'
import _ from 'lodash'
import {format} from 'date-fns'
import {initTomatoes, addTomato,updateTomatoes } from "../../redux/actions/tomatoActions";
import './Tomatoes.scss'

interface ITomatoProps {
    addTomato: (payload: any) => void
    initTomatoes:(payload:any[]) => void
    updateTomatoes:(payload:any) => void
    tomatoes: any[]
}

class Tomatoes extends React.Component<ITomatoProps> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getTomatoes()
    }
    get unfinishedTomato(){
        return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
    }
    get finishedTomatoes(){
        const finishTomatoes = this.props.tomatoes.filter( t => t.description && t.ended_at && !t.aborted)
        const obj = _.groupBy(finishTomatoes,(t)=>{
            return format(t.started_at,'YYYY-MM-D')
        })
        return obj
    }

    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (e) {
            throw new Error(e)
        }
    }
    startTomato = async () => {
        try {
            const response = await axios.post('tomatoes', {duration: 1500000})
            console.log(response)
            this.props.addTomato(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }
    }

    public render() {
        return (
            <div className="Tomatoes">
                <TomatoAction
                    startTomato={this.startTomato}
                    unfinishtomato={this.unfinishedTomato}
                    updateTomatoes = {this.props.updateTomatoes}
                />
                <TomatoList finishedTomatoes={this.finishedTomatoes}/>
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
    updateTomatoes,
    addTomato
}
export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes)