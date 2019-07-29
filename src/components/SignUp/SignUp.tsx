import * as React from 'react';
import { Input,Icon,Button } from 'antd';
import {Link} from 'react-router-dom'
import axios from 'src/config/axios'
import './SignUp.scss'


interface ISignUpState {
    account:string,
    password:string,
    passwordConfirmation:string
}

class SignUp extends React.Component<any,ISignUpState>{
    constructor(props){
        super(props)
        this.state = {
            account:'',
            password:'',
            passwordConfirmation:''
        }
    }

    onChangeAccount = (e) => {
        this.setState(
            {
                account:e.target.value
            }
        )
    }

    onChangePassword = (e) => {
        this.setState(
            {
                password:e.target.value
            }
        )
    }
    onChangePasswordConfirmation = (e) => {
        this.setState(
            {
                passwordConfirmation:e.target.value
            }
        )
    }
    submit = async () => {
        const { account,password,passwordConfirmation } = this.state;
        try{
            await axios.post('sign_up/user',{
                account,
                password,
                password_confirmation:passwordConfirmation
            })
        }catch(e){
            throw new Error(e)
        }
    }
    public render(){
        const { account,password,passwordConfirmation } = this.state;
        return(
            <div className="SignUp">
                <p className="title">番茄闹钟</p>
                <Input
                    placeholder="请输入你的用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={ account}
                    onChange={this.onChangeAccount}
                />
                <Input.Password value={password} placeholder="请输入你的密码" onChange={this.onChangePassword} />
                <Input.Password value={passwordConfirmation} placeholder="请再次输入你的密码" onChange = {this.onChangePasswordConfirmation} />
                <Button onClick={ this.submit}>注册</Button>
                 <p>如果已有账号，请直接 <Link to='/login'>立即登录</Link></p>
            </div>
        )
    }
}

export default SignUp
