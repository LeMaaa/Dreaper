/**
 * Created by lema on 2018/4/12.
 */
/**
 * Created by lema on 2018/4/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';


import {Badge, Button,Tag, List, Modal, Row, Col, Card} from "antd";
import SingleModPopUp from '../components/SingleModPopUp'
import DownloadModBar from '../components/DownloadModBar'
import ViewsModBar from '../components/ViewsModBar'
import SingleModInfo from "./SingleModInfo";
import CircleOnPanel from '../components/CircleOnPanel'
const Item = List.Item;


export default class SearchBarRowCreator extends React.Component {
    /* props required:
     index : index of current row
     entry : either keyword or creator entry
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
        axios.post('http://localhost:3000/getModByName', {
            modName : this.props.entry.value.mods
        })
            .then(res => {
                console.log("received data for by name");
                // console.log(res.data);
                console.log(res.data)
                this.setState({'currentMod' : res.data[0]});
                this.setState({ 'mods' : res.data})
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
                {/*<Badge style={{ backgroundColor: '#1890ff' }} count = {this.props.index}/>*/}
                {/*/!*<Button type="dashed" onClick = {this.addCreator}>{this.props.entry._id}</Button>*!/*/}
                {/*/!*<Tag  color="geekblue" onClick = {this.addCreator}> {this.props.entry._id} </Tag>*!/*/}
                {/*<List.Item onClick = {(e) => this.show(this.props.index)}> {this.props.index} </List.Item>*/}

                <List.Item onClick = {(e) => this.showModal(e,this.props.index)}>
                    <List.Item.Meta
                        avatar={ <Badge style={{ backgroundColor: '#1890ff' }} count={this.props.entry.rank}/>}
                        title={this.props.entry['_id']}
                        description= {"Downloads: " + this.props.entry.value.downloads}
                    />
                </List.Item>
                <Modal
                    width = {1100}
                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Row>
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


