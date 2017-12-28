import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Message } from 'element-react';
import '../css/Login.css';
import axios from 'axios';
import Qs from 'qs';

class LoginControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }
    handleInputChange(key, value ) {
        this.setState({
            [key]: value
        });
    }
    login() {
        axios.post('/login', Qs.stringify(this.state))
            .then(function (response) {
                localStorage.setItem('userInfo', JSON.stringify(response.data.resultList));
                localStorage.setItem('token', response.data.token);
                window.location.pathname="main";
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="login">
                <p className="login-title"><span></span>江安县“智慧农安”管理平台</p>
                <div class="login-box">
                    <p>登录管理系统</p>
                    <div>
                        <Input
                        value={this.state.account}
                        onChange={this.handleInputChange.bind(this, 'account')}
                        icon="message"
                        placeholder="请输入账号"
                        />
                    </div>
                    <div>
                        <Input
                        value={this.state.password}
                        onChange={this.handleInputChange.bind(this, 'password')}
                        icon="password"
                        placeholder="请输入账密码"
                        />
                    </div>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <Button type="primary" className="btn-right" onClick={this.login}>注册</Button>
                </div>
            </div>
        );
    }
}


export default LoginControl;