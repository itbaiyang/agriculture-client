import React, { Component } from 'react';
import { Input, Button, Table, Breadcrumb, Dialog, Form, Select, Message } from 'element-react';
// import { Switch, Route } from 'react-router-dom';
import 'element-theme-default';
import axios from 'axios';
import Qs from 'qs';

import '../../css/setting.css'
import Permissions from '../../components/setting/Permissions';

class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleList: [],
            columns: [
                {
                    label: "角色名称",
                    prop: "roleName"
                },
                {
                    label: "角色类型",
                    prop: "typeName",

                },
                {
                    label: "角色级别",
                    prop: "levelName",
                },
                {
                    label: "角色说明",
                    prop: "expl"
                },
                {
                    label: "日期",
                    prop: "createDate"
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
            dialogVisible: false,
            isAdd: false,
            typeOptions: [{
                value: 1,
                label: '黄金糕'
            }],
            levelOptions: [{
                value: 1,
                label: '黄金糕'
            }, {
                value: 2,
                label: '双皮奶'
            }],
            form: {
                roleName: '',
                type: '',
                levelId: '',
                expl: '',
                permissions: ''
            },
            rules: {
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                type: [
                    { type: 'number', required: true, message: '请选择角色类型', trigger: 'change' }
                ],
                levelId: [
                    { type: 'number', required: true, message: '请选择角色级别', trigger: 'change' }
                ],
                expl: [
                    { required: true, message: '请填写角色说明', trigger: 'blur' }
                ],
                permissions: [
                    { required: false, message: '请选择附加权限', trigger: 'blur' }
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
        this.getRoleList(2);
    }
    getRoleList(levelId) {
        axios.get('/roleList', { params: { 'levelId': levelId, type: 1 } })
            .then(response => {
                this.setState({
                    roleList: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="main">
                <div className="header">
                    <Breadcrumb separator="/" className="fl">
                        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                        <Breadcrumb.Item>角色管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button type="primary" icon="plus" className="fr" onClick={() => this.setState({ dialogVisible: true, isAdd: true })}></Button>
                </div>
                <div className="content"> 
                    <Table
                        style={{ width: '100%' }}
                        columns={this.state.columns}
                        data={this.state.roleList}
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
                    <div>
                        <Dialog
                            title="角色编辑"
                            visible={this.state.dialogVisible}
                            onCancel={() => this.setState({ dialogVisible: false })}
                        >
                            <Dialog.Body>
                                <Form ref="form" model={this.state.form} rules={this.state.rules}>
                                    <Form.Item label="角色名称" labelWidth="120" prop="roleName">
                                        <Input value={this.state.form.roleName} onChange={this.onChange.bind(this, 'roleName')}></Input>
                                    </Form.Item>
                                    <Form.Item label="角色类型" labelWidth="120" prop="type">
                                        <Select value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
                                            {
                                                this.state.typeOptions.map(el => {
                                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="角色级别" labelWidth="120" prop="levelId">
                                        <Select value={this.state.form.levelId} onChange={this.onChange.bind(this, 'levelId')}>
                                            {
                                                this.state.levelOptions.map(el => {
                                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    
                                    <Form.Item label="角色权限" labelWidth="120" prop="permissions">
                                        <Permissions />
                                    </Form.Item>
                                    <Form.Item label="角色说明" labelWidth="120" prop="expl">
                                        <Input value={this.state.form.expl} onChange={this.onChange.bind(this, 'expl')}></Input>
                                    </Form.Item>
                                </Form>
                            </Dialog.Body>

                            <Dialog.Footer className="dialog-footer">
                                <Button onClick={this.handleReset.bind(this)}>取 消</Button>
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>确 定</Button>
                            </Dialog.Footer>
                        </Dialog>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Role;