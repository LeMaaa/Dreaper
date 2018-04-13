/**
 * Created by lema on 2018/2/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy'

import {Badge, Button} from "antd";


export default class CircleOnPanel extends React.Component {
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

                <div className="circle "  >
                    {this.props.name}
                </div>
            </div>



        );
    }
}

