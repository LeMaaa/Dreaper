/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';

import { Row, Col, Card } from 'antd';

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

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';


class Dashboard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            startTime : "Mar 2000",
            endTime : "Dec 2020",
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
    }


    queryKeyWords() {
        axios.post('http://localhost:3000/getKeyWordWithThreshold', {
            startTime: this.state.startTime,
            endTime: this.state.endTime
        })
            .then(res => {
                console.log("received data");
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

    queryTopMods() {
        console.log("Top mods panel");
        console.log(this.props.topMods);
        axios.post('http://localhost:3000/topModsWithDownloads', {
            startTime : this.state.startTime,
            endTime : this.state.endTime,
        })
            .then(res => {
                console.log("received top mods");
                console.log(res.data);
                this.setState({ 'topMods' : res.data.slice(0,8)});
                this.setState({'topModsSearchBox' : res.data.slice(8,50)});
            });
    }


    onHandleChange(value) {
        if(value === "Creators") {
            console.log(value);
            this.setState( { "currentView": "Creators"});
        } else if(value === "Keywords") {
            console.log(value);
            this.setState({"currentView" : "Keywords" });
        } else if(value === "topMods") {
            console.log(value);
            this.setState( { "currentView": "topMods"});
        }

    }

    componentWillMount() {
        this.queryKeyWords();
        this.queryCreators();
        this.queryTopMods();
    }

    onChange(date, dateString){
        console.log("Trigger eventProxy to Change TimeRange");
        this.setState({
            'startTime' : dateString[0],
            'endTime' : dateString[1],
        });

        if (this.state.currentView === "topMods")
            this.queryTopMods();
        else if (this.state.currentView === "Keywords")
            this.queryKeyWords();
    }

    // handleChange(value) {
    //     console.log(`selected ${value}`);
    //     console.log(value);
    //     this.switchPanel(value);
    // }

    searchKeyword(value) {
        console.log("search keyword");
        console.log(value);
        var initialKeywords = this.state.keywordsForSearchBox;
        initialKeywords = initialKeywords.filter((keyword) => {
            return keyword._id.search(value) !== -1;
        });
        console.log("initialKeywords");
        console.log(initialKeywords);
        this.setState({"Searched" : true});
        this.setState({"keywordsForSearchBox_Search": initialKeywords});
    }




    render () {
        var currentPanel;
        var currentTitle;
        var currentSearchBox;
        if(this.state.currentView === "Keywords") {
            currentPanel =  <KeywordCardPanel keywords = {this.state.keywords}
                                              startTime = {this.state.startTime} endTime = {this.state.endTime} />;
            currentTitle = "Ranked By Number of Mods";
            currentSearchBox = <SearchBoxKeyword entries = {this.state.keywordsForSearchBox_Search} searched = {this.state.searched}/>
        } else if(this.state.currentView === "Creators") {
            currentPanel = <CreatorsPanel creators = {this.state.creators}/>;
            currentTitle = "Ranked By Accumulative Downloads";
            currentSearchBox = <SearchBoxCreator entries = {this.state.creatorsForSearchBox}/>
        } else if(this.state.currentView === "topMods") {
            currentPanel = <TopModsPanel topMods = {this.state.topMods}/>
            currentSearchBox = <SearchBoxTopMod entries = {this.state.topModsSearchBox}/>
            currentTitle = "Created Ranked By Accumulative Downloads";
        }



        return (
            <div className="container">
                    <Row>
                        <Col span={12} className="PanelTitle">
                             Top  {" "}
                            <Select defaultValue="Keywords" style={{ width: 120 }} size = "large" onChange={this.onHandleChange}>
                                <Option value="Keywords">Keywords</Option>
                                <Option value="Creators">Creators</Option>
                                <Option value="topMods">Mods</Option>
                            </Select>
                            {" "}{currentTitle}
                        </Col>
                        <Col span={6}></Col>
                        <Col span={6}>
                            {
                                this.state.currentView !== "Creators" ? <RangePicker
                                    size = "large"
                                    onChange = {this.onChange}
                                    format={dateFormat}
                                /> : null
                            }

                        </Col>
                    </Row>
                <br/>
                    <Row>
                        <Col span={18}>
                            {currentPanel}
                        </Col>
                        <Col span = {1}></Col>
                        <Col span = {5}>
                            <Card className="search-card"  >
                                {this.state.currentView === "Keywords" ?
                                    <Search
                                    placeholder="Search Keyword"
                                    onSearch={this.searchKeyword}
                                /> : null}
                                {currentSearchBox}
                            </Card>
                        </Col>

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
                        {this.state.currentView === "Creators" ? null : <LineChartWithTimeRange />  }
                    </Row>
            </div>
        );
    }
}

export default Dashboard;
