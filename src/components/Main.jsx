import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Menu } from 'element-react';
import 'element-theme-default';
// import axios from 'axios';
// import Qs from 'qs';
import '../css/Main.css';

import Area from '../components/Area';

const Product = () => <div>Product</div>;
const Standard = () => <div>Standard</div>;
const Acre = () => <div>acre</div>;
const Input = () => <div>Input</div>;
class HomePage extends Component {
    render() {
        return (
            <div>
                <header>人民政府</header>
                <Menu theme="dark" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
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
                    </Menu.SubMenu>
                </Menu>
                <main>
                    <Switch>
                        <Route path="/main/product" component={Product} />
                        <Route path="/main/standard" component={Standard} />
                        <Route path="/main/acre" component={Acre} />
                        <Route path="/main/input" component={Input} />
                        <Route path="/main/7-1" component={Area} />
                    </Switch>
                </main>
            </div>
        )
    }
    onSelect(index) {
        this.props.history.push('/main/'+index)
    }
}

export default HomePage;