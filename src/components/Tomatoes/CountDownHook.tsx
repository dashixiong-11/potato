import React,{useState,FunctionComponent,useEffect}  from 'react'

interface ICountDownHooksProps {
    timer:number
    onFinish:()=>void
}
let timeid:NodeJS.Timeout
const CountDownHook:FunctionComponent<ICountDownHooksProps> = (props)=>{
    const [countDown,setCountDown] = useState(props.timer)

        const min = Math.floor(countDown/1000/60)
        const second = Math.floor(countDown/1000%60)
        const time =  `${min}:${second<10?`0${second}`:second}`

    useEffect(()=>{
        document.title = time
        timeid = setInterval(()=>{
            setCountDown(countDown - 1000)
            if( countDown<0 ){
                props.onFinish()
                document.title = `番茄APP`
                clearInterval(timeid)
            }
        },1000)
        return function  cleanup() {
            clearInterval(timeid)
        }
    })

        return (
            <div className="CountDown">
                {time}
            </div>
        )
}
export default CountDownHook