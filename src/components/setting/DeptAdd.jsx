import React, { Component } from 'react';
import { Input, Tree, Button, Table, Breadcrumb, Dialog, Form, Select, Message } from 'element-react';
import { Switch, Route } from 'react-router-dom';
import 'element-theme-default';
import axios from 'axios';
import '../../css/setting.css'
class DeptAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    { required: true, message: '请选择部门级别', trigger: 'change' }
                ],
                areaId: [
                    { required: true, message: '请选择所属区划', trigger: 'change' }
                ],
                pId: [
                    { required: true, message: '请选择上级部门', trigger: 'change' }
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
            if (valid) {
                this.setState({ dialogVisible: false })
                Message({
                    message: '恭喜你，这是一条成功消息',
                    type: 'success'
                });
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



    componentDidMount() {
        this.getDeptListByArea();
    }
    getDeptListByArea(deptId) {
        axios.get('/deptList', { params: { 'deptId': 101 } })
            .then(response => {
                console.log(response);
                this.setState({
                    data: response.data.result
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { data, options } = this.state

        return (
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
                            <Form.Item label="部门级别" labelWidth="120">
                                <Select value={this.state.form.levelId} placeholder="请选择部门级别">
                                    <Select.Option label="区域一" value="shanghai"></Select.Option>
                                    <Select.Option label="区域二" value="beijing"></Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="所属区划" labelWidth="120">
                                <Select value={this.state.form.areaId} placeholder="请选择所属区划">
                                    <Select.Option label="区域一" value="shanghai"></Select.Option>
                                    <Select.Option label="区域二" value="beijing"></Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="上级部门" labelWidth="120">
                                <Select value={this.state.form.pId} placeholder="请选择上级部门">
                                    <Select.Option label="区域一" value="shanghai"></Select.Option>
                                    <Select.Option label="区域二" value="beijing"></Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="部门地址" labelWidth="120">
                                <Input value={this.state.form.address}></Input>
                            </Form.Item>
                            <Form.Item label="部门联系人" labelWidth="120">
                                <Input value={this.state.form.contact}></Input>
                            </Form.Item>
                            <Form.Item label="联系电话" labelWidth="120">
                                <Input value={this.state.form.contactNumber}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={this.handleReset.bind(this)}>取 消</Button>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}

export default DeptAdd;