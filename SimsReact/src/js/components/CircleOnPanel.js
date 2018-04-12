/**
 * Created by lema on 2018/2/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Badge, Button} from "antd";


export default class CircleOnPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>

                <div className="circle " >
                    {this.props.name}

                </div>
            </div>



        );
    }
}

