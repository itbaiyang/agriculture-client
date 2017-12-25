import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Tree } from 'element-react';
import 'element-theme-default';
import axios from 'axios';

class Area extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }],
            options: {
                children: 'children',
                label: 'label'
            }
        }
    }
    componentDidMount() {
        axios.get('/area', { params: {'areaNo':1301}})
            .then(function (response) {
                response.data.list.forEach(item => {
                    
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        const { data, options } = this.state

        return (
            <Tree
                ref={e => this.tree = e}
                data={data}
                options={options}
                accordion={true}
                onNodeClicked={node => console.log(node)}
            />
        )
    }
}

export default Area;