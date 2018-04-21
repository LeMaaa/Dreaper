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

import { Avatar, Card, Button, Modal, Row, Col, Badge, Divider, Tag, Icon } from 'antd';
import {Pie, PieChart, LabelList, Tooltip, Cell} from 'recharts'
const { Meta } = Card;

import SingleModInfo from '../components/SingleModInfo' ;
import DownloadModBar from "./DownloadModBar";
import ViewsModBar from "./ViewsModBar";
import CircleOnPanel from './CircleOnPanel'

import KeywordPieChart from "./KeywordPieChart";
import KeywordCircleOnPanel from "./CircleOnPanel";

const COLORS = ['#0088FE', '#00C49F', '#d7cce5', '#FFBB28', '#FF8042', '#ff47d1', '#6dbcb3','#ff6d70', '#3b41dd', '#06d0db', '#c85bff',
    '#e82573', '#2c6587', '#263163', '#97a5e5' ,'#ed9044', '#a86f72'];





class CreatorCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mods : [],
            creator : null,
            visible: false,
            noTitleKey: 'Downloads',
            currentMod : null,
            totalModForCurrentCreator : 0,
            keywordPieRanking : [],

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
                this.setState({
                    'mods' : res.data,
                    'totalModForCurrentCreator' : res.data.length,
                    'currentMod' :  res.data.sort(function(a, b){return b.downloads - a.downloads})[0]})
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

    populateKeywordArray() {

        let that = this;
        if(this.props.creatorEntry.value.keywords !== null && this.props.creatorEntry.value.keywords !== undefined) {
            let result = Object.keys(this.props.creatorEntry.value.keywords).map(function(key) {
                console.log(key);

                return {keyword : key,
                    downloads : that.props.creatorEntry.value.keywords[key].downloads,
                    views: that.props.creatorEntry.value.keywords[key].views};
            });

            let keywordPieRanking = result.length >= 5 ? result.slice(0, 5) : result;
            this.setState({"keywordPieRanking" : keywordPieRanking});
            
            return keywordPieRanking;

        }
    }


    componentDidMount() {
        // this.queryModsForCreator(this.props.creatorEntry);

        this.populateKeywordArray();

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
                    {/*<CircleOnPanel index = {this.props.index} name = {this.props.creatorEntry._id} />*/}
                    {this.props.creatorEntry._id}
                    <br/>
                    <Tag > <Icon type="download" /> {numeral(this.props.creatorEntry.value.downloads).format('0,0')} </Tag> <br/>
                    {numeral(this.props.creatorEntry.value.mods.length).format('0,0')} Mods


                    {/*<KeywordCircleOnPanel items = {this.state.item}/>*/}

                </Card>
                <Modal
                    title = {"No." + this.props.index + "  -  " + this.props.creatorEntry._id}

                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {1300}
                >
                    <Row type="flex" justify="space-around">
                        <Col span = {5}>
                            <Row>
                                <Card >
                                    <Badge style={{ backgroundColor: '#1890ff' }} count = {this.props.index}/>
                                    {this.props.creatorEntry._id}
                                    <br/>
                                    <Tag > <Icon type="download" /> {numeral(this.props.creatorEntry.value.downloads).format('0,0')} </Tag> <br/>
                                    {numeral(this.props.creatorEntry.value.mods.length).format('0,0')} Mods
                                </Card>
                            </Row>
                            <Row>
                                <Card >
                                    <Row>
                                        <Col span = {8}>
                                            <PieChart width={100} height={100}>
                                                {/*<Legend verticalAlign="bottom" height={50}/>*/}
                                                <Pie isAnimationActive={false} data={this.state.keywordPieRanking} dataKey="downloads" nameKey="keyword"
                                                     cx={50} cy={50} outerRadius={40} fill="#8884d8" labelLine={false}>
                                                    {this.state.keywordPieRanking.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
                                                </Pie>
                                                <Tooltip/>
                                            </PieChart>
                                        </Col>
                                        <Col span = {16}>

                                        </Col>
                                    </Row>

                                </Card>
                            </Row>
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

                        <Col span = {11}>
                            <SingleModInfo currentMod = {this.state.currentMod}/>
                        </Col>
                    </Row>

                </Modal>
            </div>




        );
    }
};

export default CreatorCard;


