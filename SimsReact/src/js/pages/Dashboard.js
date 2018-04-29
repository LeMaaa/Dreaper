/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';
import moment from 'moment';
import numeral from 'numeral';


import { Row, Col, Card, Layout  } from 'antd';
const { Header } = Layout;

import KeywordCard from '../components/KeywordCard'
import LineChartWithTimeRange from '../components/LineChartWithTimeRange'
import KeywordCardPanel from '../components/KeywordCardPanel'
import CreatorsPanel from '../components/CreatorsPanel'
import TopModsPanel from '../components/TopModsPanel'
import SearchBoxKeyword from '../components/SearchBoxKeyword'
import SearchBoxCreator from '../components/SearchBoxCreator'
import SearchBoxTopMod from '../components/SearchBoxTopMod'

import KeywordPieChart from '../components/KeywordPieChart'
import { DatePicker, Select, Input } from 'antd';
import SearchBarRowTopMod from "../components/SearchBarRowTopMod";
const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;

const Option = Select.Option;

const dateFormat = 'MM/DD/YYYY';
const monthFormat = 'YYYY/MM';

const today = moment().format(dateFormat);
const todayString = today.toString();


class Dashboard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            startTime : "1994/03/01",
            endTime : "2020/12/30",
            totalModsNum: 0,
            keywords : [],
            topMods : [],
            topModsSearchBox : [],
            keywordsForSearchBox : [],
            keywordsForSearchBox_Search: [],
            creatorsForSearchBox : [],
            creators : [],
            currentView : "Keywords",
            searched : false,
        };

        this.onChange = this.onChange.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.searchKeyword = this.searchKeyword.bind(this);
    }

    componentDidMount() {

        eventProxy.on("addKeyword", (entry) => {
            console.log("I am the added keyword");
            console.log(entry);
            this.setState({"keywords" : this.state.keywords.concat(entry)});
        });

        eventProxy.on("addCreator", (entry) => {
            console.log("I am the added creator");
            console.log(entry);
            this.setState({"creators" : this.state.creators.concat(entry)});
        });

        eventProxy.on("totalModsNum", (num) => {
            this.setState({"totalModsNum" : num});
        });
    }


    queryKeyWords(startTime ,endTime) {
        axios.post('http://localhost:3000/getKeyWordWithThreshold', {
            startTime: (startTime === null || startTime.length === 0) ? "1994/03/01" : startTime,
            endTime: (endTime === null || endTime.length === 0) ? "2020/12/30" : endTime,
        })
            .then(res => {
                console.log("received data for query keywords");
                console.log(res.data);
                this.setState({ 'keywords' : res.data.slice(0,8)});
                this.setState({'keywordsForSearchBox' : res.data.slice(8,50)});
                this.setState({"keywordsForSearchBox_Search":res.data.slice(8,50)});
                // this.setState({"currentView" : <KeywordCardPanel keywords = {this.state.keywords}
                //                                                  startTime = {this.state.startTime} endTime = {this.state.endTime} /> });
            });
    }

    queryCreators() {
        axios.post('http://localhost:3000/getCreators')
            .then(res => {
                console.log("received data");
                console.log(res.data);
                this.setState({ 'creators' : res.data.slice(0,8)});
                this.setState({'creatorsForSearchBox' : res.data.slice(8,50)});
                // this.setState({"currentView" : <KeywordCardPanel keywords = {this.state.keywords}
                //                                                  startTime = {this.state.startTime} endTime = {this.state.endTime} /> });
            });
    }

    queryTopMods(startTime, endTime) {
        console.log("Top mods panel");
        console.log(this.props.topMods);
        axios.post('http://localhost:3000/topModsWithDownloads', {
            startTime : (startTime === null || startTime.length === 0) ?  "1994/03/01" : startTime,
            endTime : (endTime === null || endTime.length === 0) ? "2020/12/30" : endTime,
        })
            .then(res => {
                console.log("received top mods");
                console.log(res.data);
                this.setState({ 'topMods' : res.data.slice(0,8)});
                // this.setState({'topModsSearchBox' : res.data.slice(8,50)});
            });
    }

    queryHotestMods() {
        console.log("Query Hottest Mods");
        axios.get('http://localhost:3000/trendingModsOfLastWeek')
            .then(res => {
                console.log("received hottest mods");
                console.log(res.data);
                this.setState({ 'topModsSearchBox' : res.data});
            });
    }

    onHandleChange(value) {
        if(value === "Creators") {
            console.log("change to creator",value);
            this.setState( { "currentView": "Creators"});
        } else if(value === "Keywords") {
            console.log("chnage to keywords", value);
            this.setState({"currentView" : "Keywords" });
        } else if(value === "topMods") {
            console.log("change to topmods", value);
            this.setState( { "currentView": "topMods"});
        }

    }

    componentWillMount() {
        this.queryKeyWords(this.state.startTime, this.state.endTime);
        this.queryCreators();
        this.queryTopMods(this.state.startTime, this.state.endTime);
        this.queryHotestMods();
    }

    onChange(date, dateString){
        console.log("Trigger eventProxy to Change TimeRange");
        console.log(dateString[0]);
        console.log(dateString[1]);
        this.setState({
            'startTime' : dateString[0],
            'endTime' : dateString[1],
        });



        this.queryTopMods(dateString[0], dateString[1]);
        this.queryKeyWords(dateString[0], dateString[1]);
    }

    searchKeyword(value) {
        console.log("search keyword");
        console.log(value);
        var initialKeywords = this.state.keywordsForSearchBox;
        if (value === "") {
            this.setState({"searched": false});
            this.setState({"keywordsForSearchBox_Search": initialKeywords});
            return;
        }

        initialKeywords = initialKeywords.filter((keyword) => {
            return keyword._id.search(value) !== -1;
        });
        console.log("initialKeywords");
        console.log(initialKeywords);

        // cannot find match in current list, ask server
        const endTime = this.state.endTime;
        const startTime = this.state.startTime
        const query_params = '?startTime=' + startTime + '&endTime=' + endTime + '&keyword=' + value;

        if (initialKeywords.length === 0) {
            return axios.get('http://localhost:3000/getMatchingKeyword'+query_params)
                .then(res => {
                    // received new keywords in current time range that matched the search value
                    // update the search box list
                    this.setState({"keywordsForSearchBox_Search": res.data});
                });
        } else {
            this.setState({"searched" : true});
            this.setState({"keywordsForSearchBox_Search": initialKeywords});
        }
    }

    disabledDate(current) {
    // Can not select days before today and today
        return current && current > moment().endOf('day');
    }


    render () {
        var currentPanel;
        var currentTitle;
        var currentSearchBox;
        if(this.state.currentView === "Keywords") {
            if(this.state.keywords === null || this.state.length === 0) {
                currentPanel = <div>Sorry :( No Data Available.</div>
            }else {
                currentPanel =  <KeywordCardPanel keywords = {this.state.keywords} totalModsNum = {this.state.totalModsNum}
                                                  startTime = {this.state.startTime} endTime = {this.state.endTime} />;
            }
            currentTitle = "Ranked By Number of Mods";
            currentSearchBox = <SearchBoxKeyword
                entries = {this.state.keywordsForSearchBox_Search}
                totalModsNum = {this.state.totalModsNum}
                searched = {this.state.searched} startTime = {this.state.startTime} endTime = {this.state.endTime}/>
        } else if(this.state.currentView === "Creators") {
            if(this.state.creators === null || this.state.creators.length === 0) {
                currentPanel = <div>Sorry :( No Data Available.</div>
            }else {
                currentPanel = <CreatorsPanel creators = {this.state.creators}/>;
            }

            currentTitle = "Ranked By Total Downloads";
            currentSearchBox = <SearchBoxCreator entries = {this.state.creatorsForSearchBox}/>
        } else if(this.state.currentView === "topMods") {
            if(this.state.topMods === null || this.state.topMods.length === 0) {
                currentPanel = <div>Sorry :( No Data Available</div>
            }else {
                currentPanel = <TopModsPanel topMods = {this.state.topMods}
                                             startTime = {this.state.startTime} endTime = {this.state.endTime}/>
            }

            currentSearchBox = <SearchBoxTopMod entries = {this.state.topModsSearchBox}/>
            currentTitle = "Created Ranked By Total Downloads";
        }

        return (
            <div className="container">
                    <Row>
                        <Col span={12} className="panel-title">
                             Top  {" "}
                            <Select defaultValue="Keywords" style={{ width: 120 }} size="large" onChange={this.onHandleChange}>
                                <Option value="Keywords">Keywords</Option>
                                <Option value="Creators">Creators</Option>
                                <Option value="topMods">Mods</Option>
                            </Select>
                            {" "}{currentTitle}
                        </Col>

                        <Col span={6}>
                            {
                                this.state.currentView !== "Creators" ?
                                    <RangePicker
                                        defaultValue={[moment('01/01/2014', dateFormat), moment(today)]}
                                        placeholder={['01/01/2014', todayString]}
                                        disabledDate={this.disabledDate}
                                        size = "large"
                                        onChange = {this.onChange}
                                        format={dateFormat}/>
                                    : null
                            }

                        </Col>
                        <Col span={2} />
                        <Col span={4} className="mods-stat-text">
                            { this.state.currentView !== "Creators" ?
                                "Total  " + numeral(this.state.totalModsNum).format("0,0") + " Mods"
                                : null }
                        </Col>
                    </Row>
                <br/>
                    <Row>
                        <Col span={18}>
                            <div className="main-panel">
                            {currentPanel}
                            </div>
                        </Col>
                        <Col span = {1}></Col>
                        <Col span = {5}>
                            <Card className="search-card" title = {this.state.currentView === "topMods" ? "What're Hot in Last 7 Days" : null}>
                                {this.state.currentView === "Keywords" ?
                                    <Search
                                    placeholder="Search Keyword"
                                    onSearch={this.searchKeyword}
                                /> : null}
                                {currentSearchBox}
                            </Card>
                        </Col>

                    </Row>
                    <Row >
                        {this.state.currentView === "Creators" ? null
                            : <LineChartWithTimeRange startTime = {this.state.startTime} endTime = {this.state.endTime} />  }
                    </Row>
            </div>
        );
    }
}

export default Dashboard;
