import * as React from 'react'
import './CountDown.scss'

interface ICountDownProps {
    timer: number
    onFinish: () => void
    duration: number
}

interface ICountDownState {
    countDown: number
}

let timerId: NodeJS.Timeout

class CountDown extends React.Component<ICountDownProps, ICountDownState> {
    constructor(props) {
        super(props)
        this.state = {
            countDown: this.props.timer
        }
    }

    get CountDown() {
        const min = Math.floor(this.state.countDown / 1000 / 60)
        const second = Math.floor(this.state.countDown / 1000 % 60)
        return `${min}:${second < 10 ? `0${second}` : second}`
    }

    componentDidMount(): void {
        timerId = setInterval(() => {
            const time = this.state.countDown
            document.title = `${this.CountDown}`
            this.setState({countDown: time - 1000})
            if (time < 1000) {
                document.title = `番茄闹钟`
                this.props.onFinish()
                clearInterval(timerId)
            }
        }, 1000)
    }

    componentWillUnmount(): void {
        clearInterval(timerId)
    }

    public render() {
        const percent = 1 - this.state.countDown / this.props.duration
        return (
            <div className="CountDown">
                <span> {this.CountDown} </span>
                <div className="progress" style={{width: `${percent * 100}%`}}/>
            </div>
        )
    }
}

export default CountDown