/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';
import numeral from 'numeral'

import { Radio, Avatar, Card, Icon, Button, Modal, Row, Col, Badge, Divider} from 'antd';
const { Meta } = Card;

import SingleModInfo from '../components/SingleModInfo' ;
import DownloadModBar from "./DownloadModBar";
import ViewsModBar from "./ViewsModBar";
import KeywordPieChart from "./KeywordPieChart";
import CircleOnPanel from "./CircleOnPanel";

class KeywordCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mods : [],
            startTime : null,
            endTime : null,
            keyword : null,
            totalNumOfCurrentKeyword : 20,
            index : -1,
            visible: false,
            noTitleKey: 'Downloads',
            currentMod : null,
            totalDownloads : 0 ,
            totalViews : 0,
            totalMods : 0,
            totalModsNumForAll : 0,

            contentListNoTitle : {
                Downloads: <p>Downloads content</p>,
                Views: <p>Views content</p>,
            },

            tabListNoTitle : [{
                key: 'Downloads',
                tab: 'Downloads',
            }, {
                key: 'Views',
                tab: 'Views',
            }],
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    showModal(){
        eventProxy.trigger('openTimeSeriesData');

        let res = this.queryModsWithinTimeRange(this.props.startTime, this.props.endTime, this.props.keyword);
            return res.then(() => {
                this.setState({
                    visible: true,
                });
            }).catch((err) => {
                console.log("error to show modal");
            });
    }


    handleOk(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
            totalDownloads : 0,
            totalViews:0
        });
    }


    queryModsWithinTimeRange(startTime, endTime, keyword) {
        console.log("query mods with time range")
        console.log(startTime);
        console.log(endTime);
        console.log(keyword);
        return axios.post('http://localhost:3000/getModsWithKeyword', {

            startTime: startTime === null ? "Mar 1994" : startTime,
            endTime: endTime === null ? "Dec 2020" : endTime,
            keyword : keyword

        })
            .then(res => {
                console.log("received data www");
                // console.log(res.data);
                console.log(res.data)
                this.setState({ 'mods' : res.data.mods, "currentMod" : res.data.mods.sort(function(a, b){return b.downloads - a.downloads})[0],
                    'totalDownloads' : res.data.totalDownloads,
                    'totalViews' : res.data.totalViews,
                    'startTime': startTime,
                    'endTime': endTime,
                    'keyword' : keyword,
                    "totalMods" : res.data.totalMods
                });
                this.renderDownloadModList();
                this.renderViewsModList();
            });
    }

    onTabChange(key, type) {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    handleTabChange(e) {
        const newView = e.target.value;
        this.setState({ 'noTitleKey': newView });
    }


    renderDownloadModList() {
        this.state.contentListNoTitle["Downloads"] = <DownloadModBar mods = {this.state.mods}
                                                                     keywordPieRanking = {null}
                                                                     totalDownloads = {this.state.totalDownloads}/>
    }


    renderViewsModList() {
        console.log("views");
        this.state.contentListNoTitle["Views"] = <ViewsModBar mods = {this.state.mods}
                                                              keywordPieRanking = {null}
                                                              totalViews = {this.state.totalViews}/>
    }

    renderKeywordCircle() {
        return <KeywordPieChart items = {this.state.item}/>
    }


    componentDidMount() {
            eventProxy.on('ChangeMod', (item) => {
                this.setState({
                    'currentMod' : item
                });
            });

            eventProxy.on("totalModsNum", (num) => {
                this.setState({
                    'totalModsNumForAll' : num
                });
            });

            eventProxy.on("showModal", (value) => {
                this.setState({
                    visible: true,
                });
            })
    }


    render () {
        const currentView = this.state.noTitleKey;
        return (
            <div>
                <Card className="stats-card" onClick={this.showModal} title = {"TOP " + this.props.index}>
                    <CircleOnPanel index = {this.props.index} name = {this.props.keyword}
                                   percentage = { numeral(this.props.value / this.props.totalModsNum).format('0.00%')}/>
                    <br />
                    <div className="textUnderCircle"> { numeral(this.props.value).format('0,0') } mods </div>

                </Card>
                <Modal
                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {1300}
                >
                    <Row type="flex" justify="space-around">
                        <Col span = {5}>
                            <Card className="stats-card" title = {"TOP " + this.props.index}>
                                <CircleOnPanel index = {this.props.index} name = {this.props.keyword}
                                               percentage = { numeral(this.props.value/this.props.totalModsNum).format('0.0%')}/>
                                <br />
                                <div className="textUnderCircle"> {numeral(this.props.value).format('0,0')} mods </div>
                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card
                                bordered = {false}
                                style={{ width: '100%' }}
                            >
                                <Radio.Group className="custom-tab-group" value={currentView} onChange={this.handleTabChange}>
                                  <Radio.Button className="custom-tab" value="Downloads">Downloads</Radio.Button>
                                  <Radio.Button className="custom-tab" value="Views">Views</Radio.Button>
                                </Radio.Group>
                                {this.state.contentListNoTitle[this.state.noTitleKey]}
                            </Card>
                        </Col>

                        <Col span = {11}>
                            <SingleModInfo currentMod = {this.state.currentMod}/>
                        </Col>
                    </Row>

                </Modal>
            </div>




        );
    }
};

export default KeywordCard;

