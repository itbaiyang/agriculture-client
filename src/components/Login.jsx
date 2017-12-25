import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
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
                <div>
                    <p>登录管理系统</p>
                    <label>
                        Name:
                        <input type="text" name="account" value={this.state.account} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    </label>
                    <button type="primary" onClick={this.login}>登录</button>
                    <Link to="/home">跳转</Link>
                </div>
            </div>
        );
    }
}


export default LoginControl;