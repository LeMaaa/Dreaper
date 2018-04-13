/**
 * Created by lema on 2018/4/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import evetProxy from 'react-eventproxy'

import {Badge, Button,Tag} from "antd";
const CheckableTag = Tag.CheckableTag;


export default class SearchBarRowKeyword extends React.Component {
    /* props required:
       index : index of current row
       entry : either keyword or creator entry
     */
    constructor(props) {
        super(props)
        this.state = {
        }
        this.addKeyword = this.addKeyword.bind(this);
        this.closeKeyword = this.closeKeyword(this);
    }

    addKeyword(event) {
        console.log("add keyword");
        console.log(this.props.entry);
        evetProxy.trigger('addKeyword', this.props.entry);
    }

    closeKeyword(keyword) {
        console.log("close keyword");
        console.log(keyword);
    }

    render() {
        return (
            <div>
                <Badge count = {this.props.index}/>
                {
                    this.props.searched ?
                        <Tag  color="geekblue" closable = {this.props.searched} onClose={closeKeyword} onClick = {this.addKeyword}> {this.props.entry._id} </Tag>
                        : <Tag  color="geekblue" onClick = {this.addKeyword}> {this.props.entry._id} </Tag>
                }

                {/*<CheckableTag onChange = {this.addKeyword}/>*/}
            </div>
        );
    }
}

