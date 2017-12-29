import React, { Component } from 'react';
import { Input, Tree, Button, Table, Breadcrumb, Dialog, Form, Select, Message } from 'element-react';
// import { Switch, Route } from 'react-router-dom';
import 'element-theme-default';
import axios from 'axios';
import Qs from 'qs';

import '../../css/setting.css'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: "用户名",
                    prop: "userName",
                    width: 180
                },
                {
                    label: "账号",
                    prop: "account",
                    width: 120
                },
                {
                    label: "所属部门",
                    prop: "deptName",
                    width: 180
                },
                {
                    label: "用户角色",
                    prop: "roleName",
                    width: 100
                },
                {
                    label: "联系电话",
                    prop: "phoneNumber",
                    width: 100
                },
                {
                    label: "日期",
                    prop: "createDate",
                    width: 150
                },
               
                {
                    label: "操作",
                    prop: "zip",
                    fixed: 'right',
                    width: 100,
                    render: () => {
                        return <span>
                            <Button type="text" size="small">查看</Button>
                            <Button type="text" size="small" onClick={this.editDept.bind(this)}>编辑</Button>
                        </span>
                    }
                }
            ],
            data: [],
            userList: [],
            treeOptions: {
                children: 'children',
                label: 'label'
            },
            dialogVisible: false,
            isAdd: false,
            options: [{
                value: 1,
                label: '黄金糕'
            }, {
                value: 2,
                label: '双皮奶'
            }, {
                value: 3,
                label: '蚵仔煎'
            }, {
                value: 4,
                label: '龙须面'
            }, {
                value: 5,
                label: '北京烤鸭'
            }],
            options1: [{
                value: 1,
                label: '黄金糕'
            }, {
                value: 2,
                label: '双皮奶'
            }],
            options2: [{
                value: 1,
                label: '黄金糕'
            }, {
                value: 2,
                label: '双皮奶'
            }],
            form: {
                deptName: '',
                levelId: '',
                areaId: '',
                pId: '',
                address: '',
                contact: '',
                contactNumber: ''
            },
            rules: {
                deptName: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' }
                ],
                levelId: [
                    { type: 'number', required: true, message: '请选择部门级别', trigger: 'change' }
                ],
                areaId: [
                    { type: 'number', required: true, message: '请选择所属区划', trigger: 'change' }
                ],
                pId: [
                    { type: 'number', required: true, message: '请选择上级部门', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请填写部门地址', trigger: 'blur' }
                ],
                contact: [
                    { required: true, message: '请填写联系人', trigger: 'blur' }
                ],
                contactNumber: [
                    { required: true, message: '请填写联系电话', trigger: 'blur' }
                ]
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            console.log(this.state.form)
            if (valid) {
                this.setState({ dialogVisible: false })
                if (this.state.isAdd) {
                    axios.post('/dept', Qs.stringify(this.state.form))
                        .then(function (response) {
                            Message({
                                message: '恭喜你，成功添加部门',
                                type: 'success'
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    axios.put('/dept', Qs.stringify(this.state.form))
                        .then(function (response) {
                            Message({
                                message: '恭喜你，成功修改部门',
                                type: 'success'
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({ dialogVisible: false })
        this.refs.form.resetFields();
        Message('取消添加部门');
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    editDept(e) {
        e.preventDefault();
        this.setState({ dialogVisible: true, isAdd: false })
    }

    componentDidMount() {
        this.getDeptListByNo(101);
    }
    getDeptListByNo(deptNo) {
        axios.get('/deptList', { params: { 'deptNo': deptNo } })
            .then(response => {
                const temp = [];
                const list = response.data.result;
                if (response.data.result.length > 0) {
                    temp.push({ label: list[0].deptName, id: list[0].deptId, children: [] });
                    this.toTree(temp, 0, list);
                }
                this.setState({
                    data: temp
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    toTree(node, index, list){
        console.log(node,list)
        for (let i = 1; i < list.length; i++) {
            console.log(list[i].pId, node[index].id)
            if (list[i].pId === node[index].id) {
                let temple = node[index].children.push({ label: list[i].deptName, id: list[i].deptId, children: [] });
                this.toTree(node[index].children, temple - 1, list);
            }
        }
    }

    getUserListByDeptId(deptId){
        axios.get('/userList', { params: { 'deptId': deptId } })
            .then(response => {
                this.setState({
                    userList: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="main">
                <div className="tree-container">
                    <Input placeholder="输入关键字进行过滤" onChange={text => this.tree.filter(text)} />
                    <Tree
                        ref={e => this.tree = e}
                        className="filter-tree"
                        data={this.state.data}
                        options={this.state.treeOptions}
                        highlightCurrent={true}
                        defaultExpandAll={true}
                        nodeKey="id"
                        filterNodeMethod={(value, data) => {
                            if (!value) return true;
                            return data.label.indexOf(value) !== -1;
                        }}
                        onCheckChange={(data, checked, indeterminate) => {
                            console.debug('onCheckChange: ', data, checked, indeterminate)
                        }}
                        onNodeClicked={(data, reactElement, ) => {
                            this.getUserListByDeptId(data.id);
                        }}
                    />
                </div>
                <div className="header">
                    <Breadcrumb separator="/" className="fl">
                        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button type="primary" icon="plus" className="fr" onClick={() => this.setState({ dialogVisible: true, isAdd: true })}></Button>
                </div>
                <div className="content tree-right">
                    <div>
                        <Dialog
                            title="收货地址"
                            visible={this.state.dialogVisible}
                            onCancel={() => this.setState({ dialogVisible: false })}
                        >
                            <Dialog.Body>
                                <Form ref="form" model={this.state.form} rules={this.state.rules}>
                                    <Form.Item label="部门名称" labelWidth="120" prop="deptName">
                                        <Input value={this.state.form.deptName} onChange={this.onChange.bind(this, 'deptName')}></Input>
                                    </Form.Item>
                                    <Form.Item label="部门级别" labelWidth="120" prop="levelId">
                                        <Select value={this.state.form.levelId} onChange={this.onChange.bind(this, 'levelId')}>
                                            {
                                                this.state.options.map(el => {
                                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="所属区划" labelWidth="120" prop="areaId">
                                        <Select value={this.state.form.areaId} onChange={this.onChange.bind(this, 'areaId')}>
                                            {
                                                this.state.options1.map(el => {
                                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="上级部门" labelWidth="120" prop="pId">
                                        <Select value={this.state.form.pId} onChange={this.onChange.bind(this, 'pId')}>
                                            {
                                                this.state.options2.map(el => {
                                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="部门地址" labelWidth="120" prop="address">
                                        <Input value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}></Input>
                                    </Form.Item>
                                    <Form.Item label="部门联系人" labelWidth="120" prop="contact">
                                        <Input value={this.state.form.contact} onChange={this.onChange.bind(this, 'contact')}></Input>
                                    </Form.Item>
                                    <Form.Item label="联系电话" labelWidth="120" prop="contactNumber">
                                        <Input value={this.state.form.contactNumber} onChange={this.onChange.bind(this, 'contactNumber')}></Input>
                                    </Form.Item>
                                </Form>
                            </Dialog.Body>

                            <Dialog.Footer className="dialog-footer">
                                <Button onClick={this.handleReset.bind(this)}>取 消</Button>
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>确 定</Button>
                            </Dialog.Footer>
                        </Dialog>
                    </div>
                    <Table
                        style={{ width: '100%' }}
                        columns={this.state.columns}
                        data={this.state.userList}
                        stripe={true}
                        highlightCurrentRow={true}
                        onCurrentChange={item => {
                            this.setState({
                                form: {
                                    deptName: item.deptName,
                                    levelId: item.levelId,
                                    areaId: item.areaId,
                                    pId: item.pId,
                                    address: item.address,
                                    contact: item.contact,
                                    contactNumber: item.contactNumber
                                },
                            });
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default User;