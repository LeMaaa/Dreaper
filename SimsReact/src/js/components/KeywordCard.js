/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';
import numeral from 'numeral'

import { Avatar, Card, Icon, Button, Modal, Row, Col, Badge, Divider} from 'antd';
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
    }

    showModal(){
        this.setState({
            visible: true,
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
        axios.post('http://localhost:3000/getModsWithKeyword', {

            startTime: startTime === null ? "Mar 1994" : startTime,
            endTime: endTime === null ? "Dec 2020" : endTime,
            keyword : keyword

        })
            .then(res => {
                console.log("received data www");
                // console.log(res.data);
                console.log(res.data)
                this.setState({ 'mods' : res.data.mods})
                this.setState({'totalDownloads' : res.data.totalDownloads});
                this.setState({'totalViews' : res.data.totalViews});
                this.setState({
                    'startTime': startTime,
                    'endTime': endTime,
                    'keyword' : keyword
                })
                this.renderDownloadModList();
                this.renderViewsModList();
            });
    }

    onTabChange(key, type) {
        console.log(key, type);
        this.setState({ [type]: key });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.startTime === this.state.startTime && nextProps.endTime === this.state.endTime
            && nextProps.keyword === this.state.keyword) return;
        this.queryModsWithinTimeRange(nextProps.startTime, nextProps.endTime, nextProps.keyword )
    }

    renderDownloadModList() {
        console.log("downlodas")
        this.state.contentListNoTitle["Downloads"] = <DownloadModBar mods = {this.state.mods} totalDownloads = {this.state.totalDownloads}/>
    }


    renderViewsModList() {
        console.log("views");
        this.state.contentListNoTitle["Views"] = <ViewsModBar mods = {this.state.mods} totalViews = {this.state.totalViews}/>
    }

    renderKeywordCircle() {
        // let item = [{
        //     name: this.props.keyword,
        //     value: this.props.value,
        // }];
        return <KeywordPieChart items = {this.state.item}/>
    }



    componentDidMount() {
        axios.post('http://localhost:3000/getModsWithKeyword', {

            startTime: this.props.startTime === null ? "Mar 1994" : this.props.startTime,
            endTime: this.props.endTime === null ? "Dec 2020" : this.props.endTime,
            keyword : this.props.keyword

        })
            .then(res => {
                console.log("received data www");
                // console.log(res.data);
                console.log(res.data)
                this.setState({"mods" : res.data.mods});
                this.setState({"totalViews" : res.data.totalViews});
                this.setState({"totalDownloads" : res.data.totalDownloads});
                this.setState({'totalNumOfCurrentKeyword': res.data.totalNumOfCurrentKeyword })

                this.setState({ 'item' : [{
                    name : this.props.keyword,
                    value : this.props.value,
                }]});

                if(this.state.currentMod === null ) {
                    this.setState({"currentMod" : res.data.mods[0]});
                }

                this.renderDownloadModList();
                this.renderViewsModList();
            });

            eventProxy.on('ChangeMod', (item) => {
                this.setState({
                    'currentMod' : item
                });
            });

            // eventProxy.on("showModal", (value) => {
            //     this.setState({
            //         visible: true,
            //     });
            // })

    }


    render () {
        return (
            <div>
                <Card onClick={this.showModal}>

                    {/*{this.renderKeywordCircle}*/}
                    {/*<div className="WrapperDefined" >*/}
                   {/*{this.props.keyword}*/}
                    {/*</div>*/}


                    <Badge style={{ backgroundColor: '#1890ff' }} count = {this.props.index}/>
                    {/*<Button icon = "close-circle-o" />*/}
                    <CircleOnPanel index = {this.props.index} name = {this.props.keyword}/>
                    <span className="textUnderCircle"> {numeral(this.props.value).format('0,0')} mods </span>

                </Card>
                <Modal
                    title = {"No." + this.props.index + "  -  " + this.props.keyword}

                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {1100}
                >
                    <Row type="flex" justify="space-around">
                        <Col span = {8}>
                            <CircleOnPanel index = {this.props.index} name = {this.props.keyword}/>
                        </Col>

                        <Col span={8}>
                            <Card
                                style={{ width: '100%' }}
                                tabList={this.state.tabListNoTitle}
                                activeTabKey={this.state.noTitleKey}
                                onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
                            >
                                {this.state.contentListNoTitle[this.state.noTitleKey]}
                            </Card>
                        </Col>

                        <Col span = {8}>
                            <SingleModInfo currentMod = {this.state.currentMod}/>
                        </Col>
                    </Row>

                </Modal>
            </div>




        );
    }
};

export default KeywordCard;

