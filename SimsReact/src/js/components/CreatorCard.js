/**
 * Created by lema on 2018/4/11.
 */
/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';
import numeral from 'numeral'

import { Avatar, Card, Icon, Button, Modal, Row, Col, Badge, Divider } from 'antd';
const { Meta } = Card;

import SingleModInfo from '../components/SingleModInfo' ;
import DownloadModBar from "./DownloadModBar";
import ViewsModBar from "./ViewsModBar";
import CircleOnPanel from './CircleOnPanel'

import KeywordPieChart from "./KeywordPieChart";
import KeywordCircleOnPanel from "./CircleOnPanel";




class CreatorCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mods : [],
            creator : null,
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

    showModal(e){
        let res = this.queryModsForCreator(this.props.creatorEntry);
        res.then(() => {
            this.setState({
                visible: true,
            });
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


    queryModsForCreator(creatorEntry) {
        console.log("query mods with time range")
        console.log(creatorEntry);

        return axios.post('http://localhost:3000/getModByName', {
            modName : creatorEntry.value.mods
        })
            .then(res => {
                console.log("received data for by name");
                // console.log(res.data);
                console.log(res.data)
                this.setState({ 'mods' : res.data})
                this.setState({'currentMod' : res.data[0]});
                this.renderDownloadModList();
                this.renderViewsModList();
            });

    }

    onTabChange(key, type) {
        console.log(key, type);
        this.setState({ [type]: key });
    }


    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.creator === this.state.creator) return;
    //     this.queryModsForCreator(nextProps.creatorEntry);
    //
    // }

    renderDownloadModList() {
        console.log("downlodas")
        this.state.contentListNoTitle["Downloads"] = <DownloadModBar mods = {this.state.mods} totalDownloads = {this.state.totalDownloads}/>
    }


    renderViewsModList() {
        console.log("views");
        this.state.contentListNoTitle["Views"] = <ViewsModBar mods = {this.state.mods} totalViews = {this.state.totalViews}/>
    }


    componentDidMount() {
        // this.queryModsForCreator(this.props.creatorEntry);

        eventProxy.on('ChangeMod', (item) => {
            this.setState({
                'currentMod' : item
            });
        });

    }


    render () {
        return (
            <div className="CreatorCircle">
                <Card onClick={this.showModal}>

                    {/*{this.renderKeywordCircle}*/}
                    {/*<div className="WrapperDefined" >*/}
                    {/*{this.props.keyword}*/}
                    {/*</div>*/}
                    <Badge style={{ backgroundColor: '#1890ff' }} count = {this.props.index}/>
                    <CircleOnPanel index = {this.props.index} name = {this.props.creatorEntry._id} />
                    <span className="textUnderCircle"> {numeral(this.props.creatorEntry.value.downloads).format('0,0')} downloads </span>

                    {/*<KeywordCircleOnPanel items = {this.state.item}/>*/}

                </Card>
                <Modal
                    title = {"No." + this.props.index + "  -  " + this.props.creatorEntry._id}

                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {1100}
                >
                    <Row type="flex" justify="space-around">
                        <Col span = {8}>
                            {/*<KeywordPieChart items = {this.state.item}/>*/}
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

export default CreatorCard;


