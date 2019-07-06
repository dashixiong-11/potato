import * as React from 'react';
import { Button} from 'antd'
import axios from 'src/config/axios'

interface IRouter {
    history:any
}
interface IIndexdata {
    user:any
}
class Index extends React.Component<IRouter,IIndexdata>{
    constructor(props:any){
        super(props)
        this.state = {
            user:{}
        }
    }
   public logout = ()=>{
        localStorage.setItem('x-token','')
        this.props.history.push('/login')
        console.log('123')
    }
    async componentWillMount(){
        await this.getMe()
    }
     getMe = async() => {
        try{
            const response = await axios.get( 'me' )
            this.setState({user:response.data})
        }catch (e) {
            if(e.response.status === 401){
                this.props.history.push('/login')
                console.error('获取用户失败')
            }
        }
}
    public render(){
        return(
            <div className="Index">
                <p>欢迎{this.state.user.account}</p>
                <Button onClick={this.logout}> 注销 </Button>
            </div>
        )
    }
}

export default Index
