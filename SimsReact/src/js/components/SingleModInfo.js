/**
 * Created by lema on 2018/4/2.
 */
import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy';
import numeral from 'numeral'
import moment from 'moment'

import TimeSeriesData from '../components/TimeSeriesData'

import {Card, Row, Col, Collapse, Divider, Tabs, Icon, Button} from 'antd'
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;


class SingleModInfo extends React.Component {
    constructor(props) {
        super(props);
        this.renderTimeSeriesData = this.renderTimeSeriesData.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    renderTimeSeriesData(mod) {
        const sort_by_date = (a, b) => {
            const timestamp1 = Date.parse(a['date'])/1000;
            const timestamp2 = Date.parse(b['date'])/1000;

            return timestamp1 - timestamp2;
        }

        let time_data = mod.time_series_data.sort(sort_by_date);

        if (time_data === null || time_data === undefined || time_data.length <= 0)
            return (<p> Sorry, this mod does not contain time series data </p>);

        let final_time_data = [];

        // accumulate same values

        let j = 0;
        for (let i = 1; i < time_data.length; i++) {

            if (time_data[j]['date'] === time_data[i]['date']) {
                time_data[j]['views'] += time_data[i]['views'];
                time_data[j]['downloads'] += time_data[i]['downloads'];
                time_data[j]['favourited'] += time_data[i]['favourited'];
                time_data[j]['thanks'] += time_data[i]['thanks'];
            } else {
                j++;
                time_data[j] = time_data[i];
            }
        }

        time_data = time_data.slice(0, j+1);

        // interpolate dates in between
        for (let i = 0; i < time_data.length-1; i++) {
            final_time_data.push(time_data[i]);

            let curDate = new Date(time_data[i].date);
            let nextDate = new Date(time_data[i+1].date)

            while (curDate.getTime() !== nextDate.getTime()) {
                curDate.setDate(curDate.getDate() + 1);

                if (curDate.getTime() >= nextDate.getTime()) {
                    break;
                } else {
                    const new_date_string = curDate.toISOString().substring(0, 10);
                    let new_time_data = {
                        'favourited': 0,
                        'views': 0,
                        'downloads': 0,
                        'thanks': 0,
                        'date': new_date_string
                    }
                    final_time_data.push(new_time_data);
                }
            }

            if (i === time_data.length-2) {
                final_time_data.push(time_data[i+1]);
            }
        }


        return final_time_data.length > 0 ? <TimeSeriesData itemForTimeSeriesData = {final_time_data} /> : "No Data Available :(";
    }

    changeTab(key) {

    }

    render() {

        const { currentMod } = this.props;

        return (
            <div>
                {
                    (currentMod === null || currentMod === undefined) ?  <div> Sorry :( Mod is unavailable</div> :
                    <Card bordered={false} style={{width: '100%'}} title = {null}>

                        <Row>
                            <h3> {currentMod.title + " (" + moment(currentMod.publish_date).format("MMM Do YY") + ")"}</h3>
                        </Row>
                        <Row>  <span className="mod-field">Link: </span><a href={currentMod.url} target="_blank"> {currentMod.url} </a></Row>
                        <Row>
                            <Col span={8} >
                                <span className="mod-field">Download:</span> <span className="mod-value"> {numeral(currentMod.downloads).format('0,0')} </span>
                            </Col>

                            <Col span={8} >
                                <span className="mod-field"> Favorite:</span> <span className="mod-value"> {numeral(currentMod.favourited).format('0,0')} </span>
                            </Col>
                            <Col span={8}>
                                <span className="mod-field">Game Version :</span> <span className="mod-value"> {currentMod.game_version} </span>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={8} >
                                <span className="mod-field">View: </span> <span className="mod-value"> {numeral(currentMod.views).format('0,0')} </span>
                            </Col>
                            <Col span={8} >
                                <span className="mod-field">Thanks: </span> <span className="mod-value"> {numeral(currentMod.thanks).format('0,0')} </span> </Col>
                            <Col span={8}>
                                <span className="mod-field">Creator : </span> <a href={"http://modthesims.info" + currentMod.artist_url} target="_blank">  <span className="mod-value"> {currentMod.artist} </span>
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <span className="mod-field">Keywords :</span> {currentMod.keywords === null || currentMod.keywords === undefined  ? "None" :
                                Object.keys(currentMod.keywords).map((key, index) => {
                                    if(index <= 9) return index === 9 || index === Object.keys(currentMod.keywords).length-1 ? (<span key = {"keywordsInSingleModInfo" + index} className="mod-value"> {key} </span>) : (<span key = {"keywordsInSingleModInfo" + index} className="mod-value"> {key + ", "} </span>);
                                })
                            }
                        </Row>
                        <Row>  <span className="mod-field">Pack Required :</span> {currentMod.pack_requirement === undefined || currentMod.pack_requirement === null ? "None" : currentMod.pack_requirement.map((pack, idx) => {
                            return idx === currentMod.pack_requirement.length-1 ? (<span key = {"keyModValue" + idx} className="mod-value"> {pack} </span>) : (<span key = {"keyModValue" + idx} className="mod-value"> {pack + ", "} </span>);
                        })} </Row>
                        <Row> <span className="mod-field">Life Cycle : </span></Row>
                        <Row>
                            <Col >
                                {this.renderTimeSeriesData(currentMod)}
                            </Col>
                        </Row>
                        <Row>
                            <Tabs className="custom-mod-tab-group" onChange={this.changeTab} type="card" defaultActiveKey="Description">
                                <TabPane tab="Description" key="Description">
                                    <div className="scroll-text mod-value"> {currentMod.description}</div>
                                </TabPane>
                                <TabPane tab="Comments" key="Comments">
                                    <div className="scroll-text mod-value">
                                        {currentMod.comments === null || currentMod.comments === undefined ? "No Data Available :(" :currentMod.comments.map((comment, index) => {
                                            return <div className="comment-section" key = {"comments" + index}> {comment.content}
                                                <Divider />
                                            </div>
                                        })}
                                    </div>
                                </TabPane>
                                <TabPane tab="Tag & Type" key="Tag&Type">
                                    <div className="scroll-text mod-value">
                                        <span style={{fontWeight : "bold"}}>Type :</span>
                                        {currentMod.types === null || currentMod.types === undefined ? "No Data Available :(" :
                                            currentMod.types.map((type, index) => {
                                            if(index < currentMod.types.length - 1) {
                                                return type + ", ";
                                            }else {
                                                return type;
                                            }
                                            })} <br/>
                                        <span style={{fontWeight : "bold"}}>Tags :</span>
                                        {currentMod.tags === null || currentMod.tags === undefined  ? "No Data Available :(" :currentMod.tags.map((tag, index) => {
                                            if(index < currentMod.tags.length - 1) {
                                                return tag + ", "
                                            }else {
                                                return tag
                                            }
                                        })}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Row>
                    </Card>
                }
            </div>
        );
    }
}

export default SingleModInfo;
