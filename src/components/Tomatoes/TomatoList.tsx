import * as React from 'react'
import {format} from 'date-fns'
import './TomatoList.scss'

interface ITomatoListProps {
    finishedTomatoes: any
}

class TomatoList extends React.Component<ITomatoListProps> {
    constructor(props) {
        super(props)
    }

    get List() {
        const d = Object.keys(this.props.finishedTomatoes).splice(0, 3)
        const datelist = d.map((t) => {
            const tomatoes = this.props.finishedTomatoes[t]
            const tomato = tomatoes.map((s) => {
                return (
                    <div className="tomatoItem" key={s.id}>
                        <span className="timeRange">
                            <span>{format(s.started_at, 'H:mm')}</span>
                            <span>-</span>
                            <span>{format(s.ended_at, 'H:mm')}</span>
                        </span>
                        <span className="description"> {s.description} </span>
                    </div>
                )
            })
            return (
                <div key={t}>
                    <div className="title">
                        <span className="time">{format(t, 'M月DD日')}</span>
                        <span className="num">完成了{tomatoes.length}个番茄</span>
                    </div>
                    <div className="tomato">
                        {tomato}
                    </div>
                </div>
            )
        })
        return datelist
    }

    public render() {
        return (
            <div className="TomatoList">
                {this.List}
            </div>
        )
    }
}

export default TomatoList