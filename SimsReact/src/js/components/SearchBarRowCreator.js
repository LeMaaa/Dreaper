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


import {Badge, Button,Tag, List} from "antd";
const Item = List.Item;


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

    show(index) {
        console.log("add creator")
        console.log(index)
    }

    render() {
        return (
            <div>
                <Badge style={{ backgroundColor: '#1890ff' }} count = {this.props.index}/>
                {/*<Button type="dashed" onClick = {this.addCreator}>{this.props.entry._id}</Button>*/}
                {/*<Tag  color="geekblue" onClick = {this.addCreator}> {this.props.entry._id} </Tag>*/}
                <List.Item onClick = {(e) => this.show(this.props.index)}> {this.props.index} </List.Item>
            </div>
        );
    }
}


