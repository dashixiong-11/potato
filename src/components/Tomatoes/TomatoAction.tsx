import * as React from 'react'
import { Button } from 'antd'

interface ITomatoProps {
    unfinishtomato:any
    startTomato:() => void
}
class TomatoAction extends React.Component<ITomatoProps> {
    constructor(props){
        super(props)
    }
    public render() {
        return (
            <div className="TomatoAction">
                <Button className="startTomato" onClick={()=>{this.props.startTomato()}}>开始番茄</Button>
            </div>
        )
    }
}

export default TomatoAction