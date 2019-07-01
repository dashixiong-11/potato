import * as React from 'react';
import { Button} from 'antd'
class Component extends React.Component{
   public login = ()=>{
        console.log('123')
    }
    public render(){
        return(
            <div className="Index">
                Index
                <Button  onClick={this.login}> denglu </Button>
            </div>
        )
    }
}

export default Component
