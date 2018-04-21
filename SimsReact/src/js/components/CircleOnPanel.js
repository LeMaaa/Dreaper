/**
 * Created by lema on 2018/2/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy'

import {Badge, Button, Tag} from "antd";


export default class CircleOnPanel extends React.Component {
    /*

        props :
        percentage : percentage of current keyword
     */
    constructor(props) {
        super(props)
        this.state = {
        }
        this.showModalProxy = this.showModalProxy.bind(this);
    }

    showModalProxy(){
        eventProxy.trigger("showModal", true);
    }

    render() {
        return (
            <div>
                <div  >
                    {this.props.name}
                    <Tag color="magenta">{this.props.percentage}</Tag>
                </div>
            </div>
        );
    }
}

