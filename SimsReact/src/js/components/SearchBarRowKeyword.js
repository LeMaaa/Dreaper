/**
 * Created by lema on 2018/4/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy'
import numeral from 'numeral'

import {Radio, Icon, Avatar, Button, Tag, Modal, Row, Col, Card, List} from "antd";
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
            totalModsNumForAll : 0,
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
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {

        eventProxy.on("ChangeMod", item => {
            this.setState({"currentMod" : item});
        });

        eventProxy.on("totalModsNum", (num) => {
            this.setState({
                'totalModsNumForAll' : num
            });
        });

    }

    queryModsforKeyword() {
        return axios.post('http://localhost:3000/getModsWithKeyword', {

            startTime: this.props.startTime === null ? "Mar 1994" : this.props.startTime,
            endTime: this.props.endTime === null ? "Dec 2020" : this.props.endTime,
            keyword : this.props.entry._id,
        })
            .then(res => {
                console.log("received data from search bar");
                // console.log(res.data);
                console.log(res.data)

                this.setState({"currentMod" : res.data.mods.sort(function(a, b){return b.downloads - a.downloads})[0]});


                this.setState({"mods" : res.data.mods, "totalViews" : res.data.totalViews,
                    "totalDownloads" : res.data.totalDownloads, 'totalNumOfCurrentKeyword': res.data.totalNumOfCurrentKeyword,
                    'item' : [{
                        name : this.props.keyword,
                        value : this.props.value,
                    }]});
                this.renderDownloadModList();
                this.renderViewsModList();
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
        let res = this.queryModsforKeyword();
        res.then(() => {
            this.setState({
                visible: true,
            });
        }).catch((err) => {
            console.log("err for show modal at search bar row for keyword");
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

    handleTabChange(e) {
        const newView = e.target.value;
        this.setState({ 'noTitleKey': newView });
    }

    render() {

        const currentView = this.state.noTitleKey;

        return (
            <div>
                <List.Item className="custom-list-item" onClick = {(e) => this.showModal(e, this.props.entry._id)}>
                    <List.Item.Meta
                        avatar={<Avatar className="custom-avatar" > {this.props.entry.rank} </Avatar> }
                        title={this.props.entry['_id']}
                        // description= {"Mods " + numeral(this.props.entry['value']).format('0,0')}
                    />
                </List.Item>

                <Modal
                    title = {null}
                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {1300}
                >
                    <Row type="flex" justify="space-around">
                        <Col span = {5}>
                            <Card className="stats-card" title = {"TOP " + this.props.entry.rank}>
                                <CircleOnPanel index = {this.props.index} name = {this.props.entry._id}
                                               percentage = { numeral(this.props.entry.value/this.props.totalModsNum).format('0.0%')}/>
                                <br />
                                <div className="textUnderCircle"> {numeral(this.props.entry.value).format('0,0')} mods </div>
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
}

