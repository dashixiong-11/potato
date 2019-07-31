import * as React from 'react'
import {Button, Input, Modal, Icon} from 'antd'
import axios from 'src/config/axios'
import CountDown from './CountDown'
import './TomatoAction.scss'

interface ITomatoProps {
    unfinishtomato: any
    startTomato: () => void
    updateTomatoes: (payload: any) => void
}

interface ITomatoActionState {
    description: string
}
const { confirm } = Modal;

class TomatoAction extends React.Component<ITomatoProps, ITomatoActionState> {
    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
    }
   showDeleteConfirm = () => {
        confirm({
            title: '你怎么这么懒，现在就要放弃?',
            content: '懒批这辈子都是废物',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk:() => {
                this.abortTomato()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onFinish=()=> {
        this.forceUpdate()
    }

    abortTomato = () => {
        document.title = `番茄闹钟`
        this.updateTomato({aborted:true})
    }
    updateTomato = async (params:any) => {
        try {
            const response = await axios.put(
                `tomatoes/${this.props.unfinishtomato.id}`,
                params
            )
            this.props.updateTomatoes(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }
    }

    addDescription = () => {
        this.updateTomato({description: this.state.description, ended_at: new Date()})
        this.setState({description: ''})
    }


    public render() {
        let html
        if (this.props.unfinishtomato === undefined) {
            html = <Button className="startTomato" onClick={() => {
                this.props.startTomato()
            }}>开始番茄</Button>
        } else {
            const startedat = Date.parse(this.props.unfinishtomato.started_at)
            const duration = this.props.unfinishtomato.duration
            const timeNow = new Date().getTime()
            const suffix = this.state.description ? <Icon type="enter" onClick={this.addDescription}/> : <span/>
            if (timeNow - startedat > duration) {
                html = <div className="inputWrapper">
                    <Input
                        placeholder="请输入刚刚完成的任务"
                        value={this.state.description}
                        suffix={suffix}
                        onChange={e => this.setState({description: e.target.value})}
                        onPressEnter={this.addDescription}
                    />
                    <Icon className="abort" type="close-circle" onClick={this.showDeleteConfirm}/>
                </div>
            } else if (timeNow - startedat < duration) {
                const timer = duration - timeNow + startedat
                html = (
                    <div className="countDownWrapper">
                        <CountDown onFinish={this.onFinish} timer={timer} duration={duration}/>
                        <Icon className="abort" type="close-circle" onClick={this.showDeleteConfirm}/>
                    </div>
                )
            }
        }
        return (
            <div className="TomatoAction">
                {html}
            </div>
        )
    }
}

export default TomatoAction