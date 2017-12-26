import React, { Component } from 'react';
import { Input, Tree } from 'element-react';
import 'element-theme-default';
import axios from 'axios';

class Area extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            options: {
                children: 'children',
                label: 'label'
            }
        }
    }
    componentDidMount() {
        axios.get('/area', { params: {'areaNo':1301,'pageSize': 300}})
            .then(response => {
                const temp = [];
                const list = response.data.list;
                if(response.data.list.length > 0) {
                    temp.push({ label: list[0].areaName, id: list[0].areaId, children: []});
                    for(let i = 1,it = 0; i < list.length; i++ ){
                        if(list[i].pId === list[0].areaNo){ 
                            temp[0].children.push({ label: list[i].areaName, id: list[i].areaId, children: []});
                            for(let j = 1; j < list.length; j++ ){
                                if(list[j].pId === list[i].areaNo){
                                    temp[0].children[it].children.push({ label: list[j].areaName, id: list[j].areaId, children: []});
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
    buildTree(index,zone){
    }
    render() {
        const { data, options } = this.state

        return (
            <div className="tree">
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
                <div className="content">adfadfs</div>
            </div>
        )
    }
}

export default Area;