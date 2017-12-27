import React, { Component } from 'react';
import { Input, Button, Table, Breadcrumb, Dialog, Form, Select, Message, Checkbox } from 'element-react';
// import { Switch, Route } from 'react-router-dom';
import 'element-theme-default';
import axios from 'axios';
import Qs from 'qs';

import '../../css/setting.css'

class Dept extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: "部门名称",
                    prop: "deptName",
                    width: 180
                },
                {
                    label: "区划名称",
                    prop: "areaName",
                    width: 120
                },
                {
                    label: "日期",
                    prop: "createDate",
                    width: 150
                },
                {
                    label: "部门级别",
                    prop: "levelName",
                    width: 100
                },
                {
                    label: "联系人",
                    prop: "contact",
                    width: 100
                },
                {
                    label: "地址",
                    prop: "address"
                },
                {
                    label: "操作",
                    prop: "zip",
                    fixed: 'right',
                    width: 100,
                    render: () => {
                        return <span><Button type="text" size="small">查看</Button><Button type="text" size="small" onClick={this.editDept.bind(this)}>编辑</Button></span>
                    }
                }
            ],
            data: [],
            dialogVisible: false,
            isAdd: false,
            levelOptions: [],
            areaOptions: [],
            pDeptOptions: [],
            productList: [],
            checkedList: [],
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
        console.log(this.state.checkedList)
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                this.setState({ dialogVisible: false })
                if(this.state.isAdd){
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
                }else {
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
        if(key==='levelId') {
            this.setState({
                form: Object.assign({}, this.state.form, { levelId: value,areaId: '',pId: '' })
            });
            this.getAreaListByLevel(value);
            this.getpDeptList(value-1);
        }else if(key==='areaId'){
            this.setState({
                form: Object.assign({}, this.state.form, { areaId: value,pId: '' })
            });
            
        }else {
            console.log(key.value)
            this.setState({
                form: Object.assign({}, this.state.form, { [key]: value })
            });
        }
    }


    editDept(e) {
        e.preventDefault();
        this.setState({ dialogVisible: true, isAdd: false })
    }

    componentDidMount() {
        this.getDeptListByArea();
        this.getLevelList();
        this.getpProductTypeList();
    }

    getLevelList() {
        axios.get('/levelList')
            .then(response => {
                this.setState({
                    levelOptions: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getAreaListByLevel(levelId) {
        axios.get('/areaList', { params: { 'levelId': levelId }})
            .then(response => {
                this.setState({
                    areaOptions: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getpDeptList(levelId){
        axios.get('/deptList', { params: { 'levelId': levelId }})
            .then(response => {
                this.setState({
                    pDeptOptions: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getpProductTypeList(){
        axios.get('/productType')
            .then(response => {
                this.setState({
                    productList: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getDeptListByArea(deptId) {
        axios.get('/deptList', { params: { 'deptId': 101 } })
            .then(response => {
                this.setState({
                    data: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleCheckedProductChange(value) {
        console.log(value)
        const checkedCount = value.length;
        const productLength = this.state.productList.length;
      
        this.setState({
          checkedList: value,
          checkAll: checkedCount === productLength,
          isIndeterminate: checkedCount > 0 && checkedCount < productLength,
        });
      }

    render() {
        return (
            <div className="tree">
                <div className="header">
                        <Breadcrumb separator="/" className="fl">
                            <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                            <Breadcrumb.Item>部门管理</Breadcrumb.Item>
                        </Breadcrumb>
                    <Button type="primary" icon="plus" className="fr" onClick={() => this.setState({ dialogVisible: true, isAdd: true,
                                form: {
                                    deptName: '',
                                    levelId: '',
                                    areaId: '',
                                    pId: '',
                                    address: '',
                                    contact: '',
                                    contactNumber: ''
                                }})}></Button>
                </div>
                <div className="content">
                    <div>
                        <Dialog
                            title="编辑部门"
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
                                                this.state.levelOptions.map(el => {
                                                    return <Select.Option key={el.levelId} label={el.levelName} value={el.levelId} />
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="所属区划" labelWidth="120" prop="areaId">
                                        <Select value={this.state.form.areaId} onChange={this.onChange.bind(this, 'areaId')}>
                                            {
                                                this.state.areaOptions.map(el => {
                                                    return <Select.Option key={el.areaId} label={el.areaName} value={el.areaId} />
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="上级部门" labelWidth="120" prop="pId">
                                        <Select value={this.state.form.pId} onChange={this.onChange.bind(this, 'pId')}>
                                            {
                                                this.state.pDeptOptions.map(el => {
                                                    return <Select.Option key={el.deptId} label={el.deptName} value={el.deptId} />
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
                                    <Form.Item label="管辖范围" labelWidth="120" prop="checkedList">
                                        <Checkbox.Group
                                            min="1"
                                            value={this.state.checkedList}
                                            onChange={this.handleCheckedProductChange.bind(this)}>
                                            {
                                            this.state.productList.map((produce, index) =>
                                                <Checkbox key={index} label={produce}></Checkbox>
                                            )
                                            }
                                        </Checkbox.Group>
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
                        data={this.state.data}
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

export default Dept;