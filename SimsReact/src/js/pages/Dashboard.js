/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'eventproxy';

import { Row, Col } from 'antd';

import KeywordCard from '../components/KeywordCard'
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';


class Dashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            startTime : null,
            endTime : null,
            keywords : []
        }
        this.onChange = this.onChange.bind(this);
    }


    queryKeyWords() {
        axios.post('http://localhost:3000/getKeyWordWithThreshold')
            .then(res => {
                console.log("received data");
                // console.log(res.data);
                this.setState({ 'keywords' : res.data})
            });
    }



    componentDidMount() {
        this.queryKeyWords();
                // 监听事件
    }

    onChange(date, dateString){
        console.log("Trigger eventProxy to Change TimeRange")
        this.setState({
            'startTime' : dateString[0],
            'endTime' : dateString[1],
        });
    }


    render () {
        return (
            <div className="container">

                    <Row>

                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6}>
                            <RangePicker
                                size = "large"
                                onChange = {this.onChange}
                                format={dateFormat}
                            />
                        </Col>
                    </Row>
                <br/>
                    <Row type="flex" justify="space-around" >
                        {
                            this.state.keywords.map((entry, index) => {
                                return <Col span={8} key = {index} >
                                    <KeywordCard keyword = {entry._id} startTime = {this.state.startTime}
                                                 endTime = {this.state.endTime}
                                                 index = {index + 1}
                                                 value = {entry.value} />
                                        </Col>
                            })
                        }
                    </Row>
                </div>

        );
    }
};

export default Dashboard;
