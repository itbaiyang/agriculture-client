import React, { Component } from 'react';
import { Input, Tree, Button, Table,Breadcrumb } from 'element-react';
import 'element-theme-default';
import axios from 'axios';
import '../../css/setting.css'
class Area extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            options: {
                children: 'children',
                label: 'label'
            },
            columns: [
                {
                    label: "日期",
                    prop: "date",
                    width: 180
                },
                {
                    label: "姓名",
                    prop: "name",
                    width: 180
                },
                {
                    label: "地址",
                    prop: "address"
                }
            ],
            data1: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
    componentDidMount() {
        axios.get('/area', { params: { 'areaNo': 1301, 'pageSize': 300 } })
            .then(response => {
                const temp = [];
                const list = response.data.list;
                if (response.data.list.length > 0) {
                    temp.push({ label: list[0].areaName, id: list[0].areaId, children: [] });
                    for (let i = 1, it = 0; i < list.length; i++) {
                        if (list[i].pId === list[0].areaNo) {
                            temp[0].children.push({ label: list[i].areaName, id: list[i].areaId, children: [] });
                            for (let j = 1; j < list.length; j++) {
                                if (list[j].pId === list[i].areaNo) {
                                    temp[0].children[it].children.push({ label: list[j].areaName, id: list[j].areaId, children: [] });
                                }
                            }
                            it++;
                        }
                    }
                }
                this.setState({
                    data: temp
                });
                console.log(this.state)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getDeptListByArea(areaId) {
        axios.get('/deptList', { params: { 'areaId': areaId } })
            .then(response => {
                console.log(this.response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    buildTree(index, zone) {
    }
    render() {
        const { data, options } = this.state

        return (
            <div className="tree">
                {/* <Breadcrumb separator="/">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>活动管理</Breadcrumb.Item>
                    <Breadcrumb.Item>活动列表</Breadcrumb.Item>
                    <Breadcrumb.Item>活动详情</Breadcrumb.Item>
                </Breadcrumb> */}
                <div className="tree-container">
                    <Input placeholder="输入关键字进行过滤" onChange={text => this.tree.filter(text)} />
                    <Tree
                        ref={e => this.tree = e}
                        className="filter-tree"
                        data={this.state.data}
                        options={this.state.options}
                        highlightCurrent={true}
                        nodeKey="id"
                        filterNodeMethod={(value, data) => {
                            if (!value) return true;
                            return data.label.indexOf(value) !== -1;
                        }}
                        onCheckChange={(data, checked, indeterminate) => {
                            console.debug('onCheckChange: ', data, checked, indeterminate)
                        }}
                        onNodeClicked={(data, reactElement, ) => {
                            console.debug('onNodeClicked: ', data, reactElement)
                            this.getDeptListByArea(data.id);
                        }}
                    />
                </div>
                <div className="content">
                    <div className="fr">
                        <Button type="primary" icon="edit"></Button>
                        <Button type="primary" icon="share"></Button>
                        <Button type="primary" icon="delete"></Button>
                        <Button type="primary" icon="search">搜索</Button>
                        <Button type="primary">上传<i className="el-icon-upload el-icon-right"></i></Button>
                    </div>
                
                    <p>部门列表</p>
                    <Table
                        style={{ width: '100%' }}
                        columns={this.state.columns}
                        data={this.state.data1}
                        stripe={true}
                    />
                </div>
            </div>
        )
    }
}

export default Area;