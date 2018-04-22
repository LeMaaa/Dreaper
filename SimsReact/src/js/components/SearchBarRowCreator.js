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
import numeral from 'numeral';


import {Badge, Button,Tag, List, Modal, Row, Col, Card, Avatar, Icon} from "antd";
import {Pie, PieChart, Tooltip, Cell, } from 'recharts'

import SingleModPopUp from '../components/SingleModPopUp'
import DownloadModBar from '../components/DownloadModBar'
import ViewsModBar from '../components/ViewsModBar'
import SingleModInfo from "./SingleModInfo";
import CircleOnPanel from '../components/CircleOnPanel'
const Item = List.Item;
const CheckableTag = Tag.CheckableTag;

const COLORS = ['#0088FE', '#00C49F', '#d7cce5', '#FFBB28', '#FF8042', '#ff47d1', '#6dbcb3','#ff6d70', '#3b41dd', '#06d0db', '#c85bff',
    '#e82573', '#2c6587', '#263163', '#97a5e5' ,'#ed9044', '#a86f72'];

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
            keywordPieRanking : [],
            selectedTags: [],

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
        eventProxy.on("ChangeMod", item => {
            this.setState({"currentMod" : item});
        });
    }

    getModByName() {
        return axios.post('http://localhost:3000/getModByName', {
            modName : this.props.creatorEntry.value.mods
        })
            .then(res => {
                console.log("received data for by name");
                // console.log(res.data);
                console.log(res.data)
                this.setState({'currentMod' : res.data[0], 'mods' : res.data});
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
        this.populateKeywordArray();
        let res = this.getModByName();
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
            totalDownloads : 0,
            totalViews:0
        });
    }

    populateKeywordArray() {

        let that = this;
        let selectedTags = [];
        let cont = 0;
        if(this.props.creatorEntry.value.keywords !== null && this.props.creatorEntry.value.keywords !== undefined) {
            let result = Object.keys(this.props.creatorEntry.value.keywords).map(function(key) {
                console.log(key);

                if(cont <= 4) {
                    selectedTags.push(key);
                    cont++;
                }

                return {keyword : key,
                    downloads : that.props.creatorEntry.value.keywords[key].downloads,
                    views: that.props.creatorEntry.value.keywords[key].views};
            });

            let keywordPieRanking = result.length >= 5 ? result.slice(0, 5) : result;
            this.setState({"keywordPieRanking" : keywordPieRanking, "selectedTags" : selectedTags});

            return keywordPieRanking;

        }
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });

        // TODO : ADD FILTER FUNCTION -- NESTED FOR LOOP DOESN'T WORK
    }


    onTabChange(key, type) {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    render() {
        let that = this;
        return (
            <div>
                {/*<Badge style={{ backgroundColor: '#1890ff' }} count = {this.props.index}/>*/}
                {/*/!*<Button type="dashed" onClick = {this.addCreator}>{this.props.entry._id}</Button>*!/*/}
                {/*/!*<Tag  color="geekblue" onClick = {this.addCreator}> {this.props.entry._id} </Tag>*!/*/}
                {/*<List.Item onClick = {(e) => this.show(this.props.index)}> {this.props.index} </List.Item>*/}

                <List.Item onClick = {(e) => this.showModal(e,this.props.index)}>
                    <List.Item.Meta
                        avatar={ <Badge style={{ backgroundColor: '#1890ff' }} count={this.props.creatorEntry.rank}/>}
                        title={this.props.creatorEntry['_id']}
                        description= {"Downloads: " + numeral(this.props.creatorEntry.value.downloads).format('0,0')}
                    />
                </List.Item>

                <Modal
                    title = {"No." + this.props.index + "  -  " + this.props.creatorEntry._id}

                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {1300}
                >
                    <Row type="flex" justify="space-around">
                        <Col span = {6}>
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
                                            <PieChart width={80} height={80}>
                                                {/*<Legend verticalAlign="bottom" height={50}/>*/}
                                                <Pie isAnimationActive={false} data={this.state.keywordPieRanking} dataKey="downloads" nameKey="keyword"
                                                     cx={30} cy={30} outerRadius={30} fill="#8884d8" labelLine={false}>
                                                    {this.state.keywordPieRanking.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
                                                </Pie>
                                                {/*<Tooltip/>*/}
                                            </PieChart>
                                        </Col>
                                        <Col span = {16}>
                                            {this.state.keywordPieRanking.map((tag, index) => (
                                                <Row  key={tag.keyword}>
                                                    <Avatar style={{color : COLORS[index % COLORS.length], backgroundColor : "#fff"}}>
                                                        {numeral(tag.downloads / that.props.creatorEntry.value.downloads).format('0.00%')}  </Avatar>
                                                    <CheckableTag
                                                        style = {{backgroundColor :
                                                            this.state.selectedTags.indexOf(tag.keyword) > -1 ? COLORS[index % COLORS.length] :  "#fff"}}
                                                        checked={this.state.selectedTags.indexOf(tag.keyword) > -1}
                                                        onChange={checked => this.handleChange(tag.keyword, checked)}
                                                    >
                                                        {tag.keyword}
                                                    </CheckableTag>
                                                </Row>
                                            ))}

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

                        <Col span = {10}>
                            <SingleModInfo currentMod = {this.state.currentMod}/>
                        </Col>
                    </Row>
                </Modal>
            </div>

        );
    }
}


