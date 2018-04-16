/**
 * Created by lema on 2018/4/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy'

import {Badge, Button,Tag, Modal, Row, Col, Card, List} from "antd";
const CheckableTag = Tag.CheckableTag;
const Item = List.Item;

import DownloadModBar from '../components/DownloadModBar'
import ViewsModBar from '../components/ViewsModBar'
import SingleModInfo from '../components/SingleModInfo'
import CircleOnPanel from '../components/CircleOnPanel'

export default class SearchBarRowKeyword extends React.Component {
    /* props required:
       index : index of current row
       entry : either keyword or creator entry

       mods:
       totalViews
       totalDownloads
     */
    constructor(props) {
        super(props)
        this.state = {
            visible : false,
            noTitleKey: 'Downloads',
            totalDownloads : 0,
            totalViews : 0,
            currentMod : null,
            totalNumOfCurrentKeyword : 0,
            mods : [],

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
        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
    }

    componentDidMount() {

        axios.post('http://localhost:3000/getModsWithKeyword', {

            startTime: this.props.startTime === null ? "Mar 1994" : this.props.startTime,
            endTime: this.props.endTime === null ? "Dec 2020" : this.props.endTime,
            keyword : this.props.entry._id,
        })
            .then(res => {
                console.log("received data from search bar");
                // console.log(res.data);
                console.log(res.data)
                if(this.state.currentMod === null ) {
                    this.setState({"currentMod" : res.data.mods[0]});
                }

                this.setState({"mods" : res.data.mods});
                this.setState({"totalViews" : res.data.totalViews});
                this.setState({"totalDownloads" : res.data.totalDownloads});
                this.setState({'totalNumOfCurrentKeyword': res.data.totalNumOfCurrentKeyword })

                this.setState({ 'item' : [{
                    name : this.props.keyword,
                    value : this.props.value,
                }]});

                this.renderDownloadModList();
                this.renderViewsModList();
            });


            eventProxy.on("ChangeMod", item => {
                this.setState({"currentMod" : item});
            });

    }

    renderDownloadModList() {
        console.log("downlodas")
        this.state.contentListNoTitle["Downloads"] = <DownloadModBar mods = {this.state.mods} totalDownloads = {this.state.totalDownloads}/>
    }


    renderViewsModList() {
        console.log("views");
        this.state.contentListNoTitle["Views"] = <ViewsModBar mods = {this.state.mods} totalViews = {this.state.totalViews}/>
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


    onTabChange(key, type) {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    render() {
        return (
            <div>
                <List.Item onClick = {(e) => this.showModal(e, this.props.entry._id)}>
                    <List.Item.Meta
                        avatar={ <Badge style={{ backgroundColor: '#1890ff' }} count={this.props.entry.rank}/>}
                        title={this.props.entry['_id']}
                        description= {"Mods " + this.props.entry['value']}
                    />
                </List.Item>

                <Modal
                    title = {"No." + this.props.entry.rank + "  -  " + this.props.entry._id}

                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {1100}
                >
                    <Row type="flex" justify="space-around">
                        <Col span = {8}>
                            <CircleOnPanel index = {this.props.entry.rank} name = {this.props.entry._id}/>
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
}

