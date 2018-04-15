/**
 * Created by lema on 2018/4/12.
 */
/**
 * Created by lema on 2018/4/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';


import {Badge, Button,Tag} from "antd";


export default class SearchBarRowCreator extends React.Component {
    /* props required:
     index : index of current row
     entry : either keyword or creator entry
     */
    constructor(props) {
        super(props)
        this.state = {
        }
        this.addCreator = this.addCreator.bind(this);
    }

    addCreator() {
        console.log("add creator")
        eventProxy.trigger("addCreator", this.props.entry);
    }

    render() {
        return (
            <div>
                <Badge style={{ backgroundColor: '#1890ff' }} count = {this.props.index}/>
                {/*<Button type="dashed" onClick = {this.addCreator}>{this.props.entry._id}</Button>*/}
                <Tag  color="geekblue" onClick = {this.addCreator}> {this.props.entry._id} </Tag>
            </div>
        );
    }
}


