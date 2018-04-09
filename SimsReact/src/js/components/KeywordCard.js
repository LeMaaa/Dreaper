/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';

import { Avatar, Card, Icon, Button, Modal, Row, Col, Badge } from 'antd';
const { Meta } = Card;

import SingleModInfo from '../components/SingleModInfo' ;
import DownloadModBar from "./DownloadModBar";
import ViewsModBar from "./ViewsModBar";




class KeywordCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mods : [],
            startTime : null,
            endTime : null,
            keyword : null,
            totalNum : 0,
            index : -1,
            visible: false,
            noTitleKey: 'Downloads',
            currentMod : null,

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
        });
    }


    queryModsWithinTimeRange(startTime, endTime, keyword) {
        axios.post('http://localhost:3000/getModsWithKeyword', {

            startTime: startTime === null ? "Mar 1994" : startTime,
            endTime: endTime === null ? "Dec 2020" : endTime,
            keyword : keyword

        })
            .then(res => {
                console.log("received data www");
                // console.log(res.data);
                console.log(res.data)
                this.setState({ 'mods' : res.data})
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
        this.state.contentListNoTitle["Downloads"] = <DownloadModBar mods = {this.state.mods}/>
    }


    renderViewsModList() {
        console.log("views");
        this.state.contentListNoTitle["Views"] = <ViewsModBar mods = {this.state.mods}/>
    }



    componentDidMount() {
        axios.post('http://localhost:3000/getModsWithKeyword', {

            startTime: this.props.startTime === null ? "Mar 1994" : startTime,
            endTime: this.props.endTime === null ? "Dec 2020" : endTime,
            keyword : this.props.keyword

        })
            .then(res => {
                console.log("received data www");
                // console.log(res.data);
                console.log(res.data)
                this.setState({ 'mods' : res.data});

                if(this.state.currentMod === null) {
                    this.state.currentMod =  this.state.mods[0];
                }

                this.renderDownloadModList();
                this.renderViewsModList();
            });

            eventProxy.on('ChangeMod', (item) => {
                this.setState({
                    'currentMod' : item
                });
            });

    }


    render () {
        return (
            <div>
                <Card title= {"No." + this.props.index} extra={<Button icon = "pie-chart" onClick={this.showModal}/>} style={{ width: 300 }}>

                    <Meta
                        title= {this.props.keyword}
                    />
                </Card>
                <Modal

                    title = {<Badge count =  {this.props.keyword + ':' + this.props.value} style={{ backgroundColor: '#52c41a' }}
                    />}
                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {900}
                >
                    <Row type="flex" justify="space-around">
                        <Col span={11}>
                            <Card
                                style={{ width: '100%' }}
                                tabList={this.state.tabListNoTitle}
                                activeTabKey={this.state.noTitleKey}
                                onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
                            >
                                {this.state.contentListNoTitle[this.state.noTitleKey]}
                            </Card>
                        </Col>
                        <Col span={1}/>
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

