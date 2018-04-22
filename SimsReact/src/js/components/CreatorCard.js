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

import { Avatar, Card, Button, Modal, Row, Col, Badge, Divider, Tag, Icon, Checkbox } from 'antd';
import {Pie, PieChart, LabelList, Tooltip, Cell} from 'recharts'
const { Meta } = Card;
const CheckableTag = Tag.CheckableTag;


import SingleModInfo from '../components/SingleModInfo' ;
import DownloadModBar from "./DownloadModBar";
import ViewsModBar from "./ViewsModBar";
import CircleOnPanel from './CircleOnPanel'

import KeywordPieChart from "./KeywordPieChart";
import KeywordCircleOnPanel from "./CircleOnPanel";

const COLORS = ['#0088FE', '#00C49F', '#c85bff', '#FFBB28', '#FF8042', '#ff47d1', '#6dbcb3','#ff6d70', '#3b41dd', '#06d0db',
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
            selectedTags: [],
            filteredMods : [],

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
        this.onChangeKeyword = this.onChangeKeyword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterKeyword = this.filterKeyword.bind(this);
    }

    showModal(e){
        let res = this.queryModsForCreator(this.props.creatorEntry);
        this.populateKeywordArray();
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
                    'filteredMods' : res.data,
                    'totalModForCurrentCreator' : res.data.length,
                    'currentMod' :  res.data.sort(function(a, b){return b.downloads - a.downloads})[0]})
                this.renderDownloadModList(res.data);
                this.renderViewsModList(res.data);
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

    renderDownloadModList(arr) {
        console.log("downlodas")
        this.state.contentListNoTitle["Downloads"] = <DownloadModBar mods = {arr} totalDownloads = {this.state.totalDownloads}/>
    }


    renderViewsModList(arr) {
        console.log("views");
        this.state.contentListNoTitle["Views"] = <ViewsModBar mods = {arr} totalViews = {this.state.totalViews}/>
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

    filterKeyword(item,nextSelectedTags) {
        console.log("item", item, nextSelectedTags)
        if(nextSelectedTags === null || nextSelectedTags === 0) return false;
        for(let i = 0; i < nextSelectedTags.length; i++) {
            console.log("tag", i, nextSelectedTags[i]);
            if(item.keywords === undefined || item.keywords === null) return false;

            if(nextSelectedTags[i] in item.keywords) {
                console.log("ssss[i])", item.keywords.hasOwnProperty(nextSelectedTags[i]))
                return true;
            }
        }
        return false;
    }

    onChangeKeyword (checkedValues) {
        console.log('checked = ', checkedValues);
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        let arr = this.state.mods.filter((item) => this.filterKeyword(item,nextSelectedTags));
        this.setState({"filteredMods" : arr, "selectedTags": nextSelectedTags});
        this.renderDownloadModList(arr);
        this.renderViewsModList(arr);
        console.log("arr", arr);
        // TODO : PROBLEMS WITH KWYWORD ITSELF
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
        const that = this;

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
                                            {/*<Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeKeyword}>*/}
                                            {/*{*/}
                                                {/*this.state.keywordPieRanking.map((entry, index) =>*/}
                                                    {/*<Row key={entry.keyword}> <Avatar style={{backgroundColor :#fff}}/>*/}
                                                        {/*<Checkbox value= {entry.keyword}>{entry.keyword}</Checkbox>*/}
                                                    {/*</Row>)*/}
                                            {/*}*/}
                                            {/*</Checkbox.Group>*/}


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
};

export default CreatorCard;


