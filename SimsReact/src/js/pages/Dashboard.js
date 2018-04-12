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
import KeywordCardPanel from '../components/KeywordCardPanel'
import CreatorsPanel from '../components/CreatorsPanel'
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
            startTime : "Mar 1994",
            endTime : "Dec 2050",
            keywords : [],
            creators : [],
            currentView : "Keywords",
        };

        this.onChange = this.onChange.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }


    queryKeyWords() {
        axios.post('http://localhost:3000/getKeyWordWithThreshold')
            .then(res => {
                console.log("received data");
                console.log(res.data);
                this.setState({ 'keywords' : res.data})
                // this.setState({"currentView" : <KeywordCardPanel keywords = {this.state.keywords}
                //                                                  startTime = {this.state.startTime} endTime = {this.state.endTime} /> });
            });
    }

    queryCreators() {
        axios.post('http://localhost:3000/getCreators')
            .then(res => {
                console.log("received data");
                console.log(res.data);
                this.setState({ 'creators' : res.data})
                // this.setState({"currentView" : <KeywordCardPanel keywords = {this.state.keywords}
                //                                                  startTime = {this.state.startTime} endTime = {this.state.endTime} /> });
            });
    }


    onHandleChange(value) {
        if(value === "Creators") {
            console.log(value)
            this.setState( { "currentView": "Creators"});
        }else if(value === "Keywords") {
            console.log(value)
            this.setState({"currentView" : "Keywords" });
        }

    }




    componentDidMount() {
        this.queryKeyWords();
        this.queryCreators();
    }

    onChange(date, dateString){
        console.log("Trigger eventProxy to Change TimeRange")
        this.setState({
            'startTime' : dateString[0],
            'endTime' : dateString[1],
        });
    }

    // handleChange(value) {
    //     console.log(`selected ${value}`);
    //     console.log(value);
    //     this.switchPanel(value);
    // }



    render () {
        var currentPanel;
        var currentTitle;
        if(this.state.currentView === "Keywords") {
            currentPanel =  <KeywordCardPanel keywords = {this.state.keywords}
                                              startTime = {this.state.startTime} endTime = {this.state.endTime} />;
            currentTitle = "Number of Mods"
        }else if(this.state.currentView === "Creators") {
            currentPanel = <CreatorsPanel creators = {this.state.creators}/>
            currentTitle = "Accumulative Downloads"
        }else if(this.state.currentView === "TopMods") {
            currentPanel = null;
            currentTitle = null;
        }

        return (
            <div className="container">
                <Row>
                    <Col span = {18}>
                        <Row>
                            <Col span={12} className="PanelTitle">
                                 Top  {" "}
                                <Select defaultValue="Keywords" style={{ width: 120 }} size = "large" onChange={this.onHandleChange}>
                                    <Option value="Keywords">Keywords</Option>
                                    <Option value="Creators">Creators</Option>
                                </Select>
                                {" "}Ranked By {currentTitle}
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}>
                                {
                                    this.state.currentView === "Keywords" ? <RangePicker
                                        size = "large"
                                        onChange = {this.onChange}
                                        format={dateFormat}
                                    /> : null
                                }

                            </Col>
                        </Row>
                    <br/>
                        <Row>
                            {
                                currentPanel
                            }
                        </Row>
                            {/*<Row type="flex" justify="space-around" >*/}
                                {/*{*/}
                                    {/*this.state.keywords.map((entry, index) => {*/}
                                        {/*return <Col span={6} key = {index} >*/}
                                            {/*<KeywordCard keyword = {entry._id} startTime = {this.state.startTime}*/}
                                                         {/*endTime = {this.state.endTime}*/}
                                                         {/*index = {index + 1}*/}
                                                         {/*value = {entry.value} />*/}
                                                {/*</Col>*/}
                                    {/*})*/}
                                {/*}*/}
                            {/*</Row>*/}
                        <Row >
                            <LineChartWithTimeRange />
                        </Row>
                    </Col>
                    <Col span = {6}>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default Dashboard;
