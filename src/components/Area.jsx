import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Tree } from 'element-react';
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
        console.log(this.state,111)
        axios.get('/area', { params: {'areaNo':1301,'pageSize': 300}})
            .then(response => {
                const temp = [];
                const list = response.data.list;
                if(response.data.list.length > 0) {
                    temp.push({label:list[0].areaName, children: []});
                    for(let i = 1,it = 0; i < list.length; i++ ){
                        if(list[i].pId === list[0].areaNo){ 
                            temp[0].children.push({label:list[i].areaName, children: []});
                            for(let j = 1; j < list.length; j++ ){
                                if(list[j].pId === list[i].areaNo){
                                    temp[0].children[it].children.push({label:list[j].areaName, children: []});
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

    buildTree(index,zone){
        // for(let i = index; i < list.length; i++ ){

        // }
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