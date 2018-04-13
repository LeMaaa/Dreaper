/**
 * Created by lema on 2018/4/9.
 */



/**
 * Created by lema on 2018/2/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Col, Row } from 'antd';

import KeywordCard from '../components/KeywordCard';

const COLORS = ['#a86f72','#263163', '#00C49F', '#d7cce5', '#97a5e5', '#FFBB28',  '#ff47d1', '#6dbcb3','#ff6d70', '#3b41dd',  '#c85bff',
    '#e82573', '#ed9044' ,'#0088FE', '#FF8042', '#06d0db',];

export default class KeywordCardPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Row type="flex" justify="space-around" >
                {
                    this.props.keywords.map((entry, index) => {
                        return <Col span={6} key = {index} >
                            <KeywordCard keyword = {entry._id} startTime = {this.props.startTime}
                                         endTime = {this.props.endTime}
                                         index = {index + 1}
                                         value = {entry.value} />
                        </Col>
                    })
                }
            </Row>

        );
    }
}


