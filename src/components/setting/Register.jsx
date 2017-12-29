import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Form, Select, Layout, DatePicker, Switch, TimePicker, Checkbox, Radio, Input, Button, Cascader } from 'element-react';
import '../../css/Login.css';
import axios from 'axios';
import Qs from 'qs';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                account: '',
                checkCode: '',
                companyName: '',
                areas: [],
                checkedList: [],
                productNo: '',
                region: '',
                date1: null,
                date2: null,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' }
                ],
                checkCode: [
                    { required: true, message: '请输入短信验证码', trigger: 'blur' }
                ], 
                companyName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ], 
                areas: [
                    { type: 'array', required: true, message: '请选择区划信息', trigger: 'change'  }
                ],
                checkedList: [
                    { type: 'array', required: true, message: '请选择产品类型', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            options: [],
            productList: [],
            checkedList: []
        };
        this.register = this.register.bind(this);
    }

    // 预加载
    componentDidMount() {
        this.getAreaListByNo(1301);
        this.getpProductTypeList();
    }
    // 获取区划列表
    getAreaListByNo(areaNo) {
        axios.get('/area', { params: { 'areaNo': areaNo, 'pageSize': 300 } })
            .then(response => {
                const temp = [];
                const list = response.data.list;
                if (response.data.list.length > 0) {
                    temp.push({ label: list[0].areaName, value: list[0].areaNo});
                    this.toTree(temp, 0, list);
                }
                this.setState({
                    options: temp
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //一维对象转多维
    toTree(node, index, list) {
        for (let i = 1; i < list.length; i++) {
            if (list[i].pId === node[index].value) {
                if (!node[index].children){
                    node[index].children = [];
                }
                let temple = node[index].children.push({ label: list[i].areaName, value: list[i].areaNo });
                this.toTree(node[index].children, temple - 1, list);   
            }
        }
    }
    register(e) {
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                alert('submit!');
                // axios.post('/login', Qs.stringify(this.state))
                //     .then(function (response) {
                //         localStorage.setItem('userInfo', JSON.stringify(response.data.resultList));
                //         localStorage.setItem('token', response.data.token);
                //         window.location.pathname = "main";
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            } else {
                console.log('error submit!!');
                return false;
            }
        });
        
    }

    handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    handleReset(e) {
        e.preventDefault();
        this.refs.form.resetFields();
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
        if(key === 'checkedList'){
            var temp = 0;
            for (let i = 0; i < value.length; i++){
                temp = Math.pow(2, value[i]-1) + temp
            }
            this.setState({
                form: Object.assign({}, this.state.form, { productNo: temp })
            });
        }
        console.log(this.state.form)
    }
    getpProductTypeList() {
        axios.get('/productType')
            .then(response => {
                console.log(response, this.state.productList instanceof Array, response.data.result instanceof Array)
                this.setState({
                    productList: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="register">
                <p>任丘市农产品质量管理与追溯系统</p>
                <div className="register-container">  
                <h1>欢迎注册“智慧农安”追溯平台</h1>     
                    <div className="register-box">
                        <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" className="demo-ruleForm">
                            <Form.Item labelWidth='0' prop="account">
                                <Input value={this.state.form.account} placeholder="请输入手机号码"  onChange={this.onChange.bind(this, 'account')}></Input>
                            </Form.Item>
                            <Form.Item labelWidth='0' prop="checkCode">
                                <Input value={this.state.form.checkCode} className="check-code"
                                    placeholder="请输入短信验证码"
                                    onChange={this.onChange.bind(this, 'checkCode')}
                                ></Input>
                                <Button type="danger">获取验证码</Button>
                            </Form.Item>
                            <Form.Item labelWidth='0' prop="companyName">
                                <Input value={this.state.form.companyName} placeholder="请输入企业名称（营业执照）" onChange={this.onChange.bind(this, 'companyName')}></Input>
                            </Form.Item>
                            <Form.Item labelWidth='0' prop="areas">
                                <Cascader
                                    options={this.state.options}
                                    placeholder="请选择所属区划"
                                    expandTrigger="hover"
                                    value={this.state.form.areas}
                                    onChange={this.onChange.bind(this, 'areas')} />
                            </Form.Item>
                            <Form.Item labelWidth='0' prop="checkedList">
                                <Checkbox.Group
                                    value={this.state.form.checkedList}
                                    onChange={this.onChange.bind(this, 'checkedList')}>
                                    {
                                        this.state.productList.map(el =>
                                            <Checkbox key={el.id} label={el.typeName} value={el.id}></Checkbox>
                                        )
                                    }
                                </Checkbox.Group>
                            </Form.Item>


                            {/* <Form.Item label="活动区域" prop="region">
                                <Select value={this.state.form.region} placeholder="请选择活动区域" onChange={this.onChange.bind(this, 'region')}>
                                    <Select.Option label="区域一" value="shanghai"></Select.Option>
                                    <Select.Option label="区域二" value="beijing"></Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="活动时间" required={true}>
                                <Layout.Col span="11">
                                    <Form.Item prop="date1" labelWidth="0px">
                                        <DatePicker
                                            value={this.state.form.date1}
                                            placeholder="选择日期"
                                            onChange={this.onChange.bind(this, 'date1')}
                                        />
                                    </Form.Item>
                                </Layout.Col>
                                <Layout.Col className="line" span="2">-</Layout.Col>
                                <Layout.Col span="11">
                                    <Form.Item prop="date2" labelWidth="0px">
                                        <TimePicker
                                            value={this.state.form.date2}
                                            selectableRange="18:30:00 - 20:30:00"
                                            placeholder="选择时间"
                                            onChange={this.onChange.bind(this, 'date2')}
                                        />
                                    </Form.Item>
                                </Layout.Col>
                            </Form.Item>
                            <Form.Item label="即时配送" prop="delivery">
                                <Switch value={this.state.form.delivery} onChange={this.onChange.bind(this, 'delivery')}></Switch>
                            </Form.Item>
                            <Form.Item label="活动性质" prop="type">
                                <Checkbox.Group value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
                                    <Checkbox label="美食/餐厅线上活动" name="type"></Checkbox>
                                    <Checkbox label="地推活动" name="type"></Checkbox>
                                    <Checkbox label="线下主题活动" name="type"></Checkbox>
                                    <Checkbox label="单纯品牌曝光" name="type"></Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item label="特殊资源" prop="resource">
                                <Radio.Group value={this.state.form.resource} onChange={this.onChange.bind(this, 'resource')}>
                                    <Radio value="线上品牌商赞助"></Radio>
                                    <Radio value="线下场地免费"></Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="活动形式" prop="desc">
                                <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                            </Form.Item> */}
                            <Form.Item>
                                <Button type="primary" onClick={this.register.bind(this)}>注册</Button>
                                <Button onClick={this.handleReset.bind(this)}>重置</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>      
            </div>
        );
    }
}


export default Register;