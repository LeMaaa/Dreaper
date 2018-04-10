/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'eventproxy';

import { Row, Col } from 'antd';

import KeywordCard from '../components/KeywordCard'
import LineChartWithTimeRange from '../components/LineChartWithTimeRange'
import KeywordPieChart from '../components/KeywordPieChart'
import { DatePicker, Select } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;

const Option = Select.Option;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';


class Dashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            startTime : null,
            endTime : null,
            keywords : []
        };

        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange(this);
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

    handleChange(value) {
        console.log(`selected ${value}`);
    }




    render () {
        return (
            <div className="container">

                    <Row>
                        <Col span={12} className="PanelTitle">
                             Top 8 {" "}
                            <Select defaultValue="Creations" style={{ width: 120 }} size = "large" onChange={this.handleChange}>
                                <Option value="Creations">Creations</Option>
                                <Option value="Creators">Creators</Option>
                            </Select>
                            {" "}By Number Of Creations
                        </Col>
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
                                return <Col span={6} key = {index} >
                                    <KeywordCard keyword = {entry._id} startTime = {this.state.startTime}
                                                 endTime = {this.state.endTime}
                                                 index = {index + 1}
                                                 value = {entry.value} />
                                        </Col>
                            })
                        }
                    </Row>
                <Row >
                    <LineChartWithTimeRange />
                </Row>
                </div>

        );
    }
};

export default Dashboard;
