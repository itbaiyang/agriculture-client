import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Menu } from 'element-react';
import 'element-theme-default';
// import axios from 'axios';
// import Qs from 'qs';
import '../css/Main.css';

import Area from '../components/setting/Area';
import Dept from '../components/setting/Dept';
import User from '../components/setting/User';
import Role from '../components/setting/Role'; 
const Product = () => <div>Product</div>;
const Standard = () => <div>Standard</div>;
const Acre = () => <div>acre</div>;
const Input = () => <div>Input</div>;
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSelect: window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1)
        };
    }
    componentDidMount() {
        // console.log(this.state.activeSelect)
    }
  
    render() {
        return (
            <div className="main">
                <header>
                    <div className="clearfix">
                        <div className="main-left fl">
                            <p><span></span>江安县“智慧农安”管理平台</p>
                        </div>
                        <div className="main-right fr">
                            <p>您好,今天是2017年12月25号，星期一</p>
                            <p><span>退出</span>|<span>白杨</span></p>
                        </div>
                    </div>
                </header>
                <div className="main-menu">
                    <Menu theme="dark" className="el-menu-main" defaultActive="7" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                        <Menu.Item index="0">首页</Menu.Item>
                        <Menu.Item index="1">我的产品</Menu.Item>
                        <Menu.Item index="2">生产标准</Menu.Item>
                        <Menu.Item index="3">生产场地</Menu.Item>
                        <Menu.Item index="4">投入品</Menu.Item>
                        <Menu.SubMenu index="5" title="我的工作台">
                            <Menu.Item index="5-1">选项</Menu.Item>
                            <Menu.Item index="5-2">选项</Menu.Item>
                            <Menu.Item index="5-3">选项</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item index="6">订单管理</Menu.Item>
                        <Menu.SubMenu index="7" title="系统设置">
                            <Menu.Item index="7-1">区划设置</Menu.Item>
                            <Menu.Item index="7-2">部门设置</Menu.Item>
                            <Menu.Item index="7-3">用户设置</Menu.Item>
                            <Menu.Item index="7-4">角色设置</Menu.Item>
                            {/* <Menu.Item index="7-5">权限设置</Menu.Item> */}
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <main className="container">
                    <Switch>
                        <Route path="/main/1" component={Product} />
                        <Route path="/main/2" component={Standard} />
                        <Route path="/main/3" component={Acre} />
                        <Route path="/main/4" component={Input} />
                        <Route path="/main/7-1" component={Area} />
                        <Route path="/main/7-2" component={Dept} />
                        <Route path="/main/7-3" component={User} />
                        <Route path="/main/7-4" component={Role} />
                        {/* <Route path="/main/7-5" component={Permissions} /> */}
                    </Switch>
                </main>
                <footer className="footer">版权所有：江安县畜牧水产局 、农业局&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;技术支持：智锐达仪器科技南通有限公司</footer>
            </div>
        )
    }
    onSelect(index) {
        this.setState({
            activeSelect: index
        });
        this.props.history.push('/main/'+index)
    }
}

export default HomePage;