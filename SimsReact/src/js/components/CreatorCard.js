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

import { Radio, Avatar, Card, Button, Modal, Row, Col, Badge, Divider, Tag, Icon, Checkbox } from 'antd';
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
            pieChartDownloads : 0,
            pieChartViews : 0,
            totalModsCount: 0,
            keywordColorMap : [],
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
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.filterKeyword = this.filterKeyword.bind(this);
        this.renderModList = this.renderModList.bind(this);
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
            });

    }

    onTabChange(key, type) {
        console.log(key, type);
        this.setState({ [type]: key });
    }
    

    renderModList() {
        if (this.state.noTitleKey === 'Downloads') {
            return  (<DownloadModBar mods = {this.state.filteredMods}  keywordPieRanking = {this.state.keywordColorMap} totalDownloads={this.props.creatorEntry.value.downloads}/>);
        } else if (this.state.noTitleKey === 'Views') {
            return (<ViewsModBar mods = {this.state.filteredMods}  keywordPieRanking = {this.state.keywordColorMap} totalViews={this.props.creatorEntry.value.views}/>);
        }
    }

    // return keyword array in correct rank
    populateKeywordArray() {

        let selectedTags = [], cont = 0, pieChartDownloads = 0, pieChartViews = 0
        let otherDownloads = 0, otherViews = 0;
        let matched_mods = {};
        const total_mod_count = this.props.creatorEntry.value.mods.length;
        const entry_keywords = this.props.creatorEntry.value.keywords;

        if(entry_keywords !== null && entry_keywords !== undefined) {
            let result = Object.keys(entry_keywords).sort(function (k1, k2) {
                return entry_keywords[k2].mods.length - entry_keywords[k1].mods.length;
            }).map((key, index) => {
                console.log(key);
                if (cont < 4) {
                    selectedTags.push(key);
                    cont++;
                    pieChartDownloads = pieChartDownloads + entry_keywords[key].downloads;
                    pieChartViews = pieChartViews + entry_keywords[key].views;

                    for (let i = 0; i < entry_keywords[key].mods.length; i++) {
                        matched_mods[entry_keywords[key].mods[i]] = true;
                    }

                    return {
                        keyword : key,
                        downloads : entry_keywords[key].downloads,
                        views: entry_keywords[key].views,
                        count: entry_keywords[key].mods.length,
                        color : COLORS[index % COLORS.length] 
                    };

                } else {
                        otherDownloads = otherDownloads +  entry_keywords[key].downloads;
                        otherViews =  otherViews + entry_keywords[key].views
                };
            });

            let keywordPieRanking = result.length >= 4 ? result.slice(0, 4) : result;
            keywordPieRanking.push({
                keyword: "other",
                downloads: otherDownloads,
                views: otherViews,
                count: total_mod_count,
                color : COLORS[cont % COLORS.length]
            });
            selectedTags.push("other");
            pieChartDownloads = pieChartDownloads + otherDownloads;
            this.setState({
                "keywordPieRanking" : keywordPieRanking, 
                "selectedTags" : selectedTags,
                "pieChartViews" : pieChartViews, 
                "pieChartDownloads": pieChartDownloads, 
                "totalModsCount" : total_mod_count,
                "keywordColorMap" : keywordPieRanking
            });
            console.log("keyword ranking", keywordPieRanking)
        }
    }

    filterKeyword(item, nextSelectedTags) {
        // console.log("item", item, nextSelectedTags)
        if(nextSelectedTags === null || nextSelectedTags === 0) return false;
        let isOther = false;
        for(let i = 0; i < nextSelectedTags.length; i++) {
            // console.log("tag", i, nextSelectedTags[i]);
            if(item.keywords === undefined || item.keywords === null) return false;
            if(nextSelectedTags[i] === "other") {
                isOther = true;
                continue;
            }
            if(nextSelectedTags[i] in item.keywords) {
                console.log("ssss[i])", item.keywords.hasOwnProperty(nextSelectedTags[i]))
                return true;
            }
        }
        if(isOther) return true;
        return false;
    }

    onChangeKeyword (checkedValues) {
        console.log('checked = ', checkedValues);
    }

    handleTabChange(e) {
        const newView = e.target.value;
        this.setState({ 'noTitleKey': newView });
    }

    handleChange(tag, checked) {
        const { selectedTags, keywordColorMap, keywordPieRanking } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        const matchedKeyword = keywordPieRanking.find((entry) => { return entry.keyword === tag });
        console.log(matchedKeyword);

        // need to maintain the ordering for the former four based on downloads
        let newKeywordColorMap = [];

        if (checked) {
            if (matchedKeyword) {
                if (matchedKeyword.keyword === "other") {
                    newKeywordColorMap = [...keywordColorMap, matchedKeyword];
                } else {
                    for (let i = 0; i < keywordColorMap.length; i++) {
                        // If matched keyword downloads is larger, place it into the new array
                        // or if current one is other, place mathced before
                        if (matchedKeyword.count > keywordColorMap[i].count || keywordColorMap[i].keyword === "other") {
                            newKeywordColorMap.push(matchedKeyword);
                            while (i < keywordColorMap.length) {
                                newKeywordColorMap.push(keywordColorMap[i]);
                                i++;
                            }
                            break;
                        } else {
                            newKeywordColorMap.push(keywordColorMap[i])
                            if (i === keywordColorMap.length-1) {
                                newKeywordColorMap.push(matchedKeyword);
                            }
                        }
                    }

                    if (keywordColorMap.length === 0)
                        newKeywordColorMap.push(matchedKeyword);
                }

            } else {
                newKeywordColorMap = keywordColorMap;
            }
        } else {
            newKeywordColorMap = keywordColorMap.filter(t => t.keyword !== tag);
        }

        let arr = this.state.mods.filter((item) => this.filterKeyword(item,nextSelectedTags));

        this.setState({
            "filteredMods": arr, 
            "selectedTags": nextSelectedTags, 
            "keywordColorMap": newKeywordColorMap
        });
    }


    componentDidMount() {
        eventProxy.on('ChangeMod', (item) => {
            this.setState({
                'currentMod' : item
            });
        });
    }


    render () {
        const that = this;

        const currentView = this.state.noTitleKey;

        return (
            <div>
                <Card className="stats-card" onClick={this.showModal} title = {"TOP " + this.props.index}>
                    <div className="card-main-text"> {this.props.creatorEntry._id} </div>
                    <br/>
                    <Tag className="percentage-tag"> <Icon type="download" /> {numeral(this.props.creatorEntry.value.downloads).format('0,0')} </Tag> <br/>
                    <div className="textUnderCircle"> {numeral(this.props.creatorEntry.value.mods.length).format('0,0')} Mods </div>
                </Card>
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
                            <Row>
                                <Card className="stats-card" title = {"TOP " + this.props.index}>
                                    <div className="card-main-text"> {this.props.creatorEntry._id} </div>
                                    <br/>
                                    <Tag className="percentage-tag"> <Icon type="download" /> {numeral(this.props.creatorEntry.value.downloads).format('0,0')} </Tag> <br/>
                                    <div className="textUnderCircle"> {numeral(this.props.creatorEntry.value.mods.length).format('0,0')} Mods </div>
                                </Card>
                            </Row>
                            <br/>
                            <Row>
                                <Card className="stats-card" title = {"Creator's Top Keywords"} >
                                    <Row>
{/*                                        <Col span = {8}>
                                            <PieChart width={80} height={80}>
                                                <Pie isAnimationActive={false} data={this.state.keywordPieRanking} dataKey="downloads" nameKey="keyword"
                                                     cx={30} cy={30} outerRadius={30} fill="#8884d8" labelLine={false}>
                                                    {this.state.keywordPieRanking.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
                                                </Pie>
                                            </PieChart>
                                        </Col>*/}
                                        <Col span = {24}>
                                            {this.state.keywordPieRanking.map((tag, index) => (
                                                <Row  key={tag.keyword}>
                                                    <Avatar style={{color : COLORS[index % COLORS.length], backgroundColor : "#fff"}}>
                                                        {numeral(tag.count /  that.state.totalModsCount).format('0.00%')}  </Avatar>
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
                        <Col span = {1}/>
                        <Col span={8}>
                            <Card
                                bordered={false}
                                style={{ width: '100%' }}
                            >
                                <Radio.Group className="custom-tab-group" value={currentView} onChange={this.handleTabChange}>
                                  <Radio.Button className="custom-tab" value="Downloads">Downloads</Radio.Button>
                                  <Radio.Button className="custom-tab" value="Views">Views</Radio.Button>
                                </Radio.Group>
                                {this.renderModList()}
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


