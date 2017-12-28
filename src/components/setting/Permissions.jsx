
import React, { Component } from 'react';
import { Input, Tree, Button, Table, Breadcrumb, Dialog, Form, Select, Message, Transfer } from 'element-react';
import { Switch, Route } from 'react-router-dom';
import 'element-theme-default';
import axios from 'axios';
import Qs from 'qs';

import '../../css/setting.css'

class Permissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [1, 4]
        }
        this._handleChange = this.handleChange.bind(this);
    }

    get data() {
        const data = [];
        for (let i = 1; i <= 6; i++) {
            data.push({
                key: i,
                label: `备选项 ${i}`,
                disabled: i % 4 === 0
            });
        }
        return data;
    }

    handleChange(value) {
        this.setState({ value })
    }

    render() {
        const { value } = this.state;
        return <Transfer value={value} data={this.data} onChange={this._handleChange}></Transfer>
    }
}

export default Permissions;