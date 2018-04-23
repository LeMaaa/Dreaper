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
        if (mod.time_series_data !== null && mod.time_series_data !== undefined &&  mod.time_series_data.length > 0)
            return <TimeSeriesData itemForTimeSeriesData = {mod.time_series_data.sort(sort_by_date)} />;
        else
            return (<p> Sorry, this mod does not contain time series data </p>);

    }

    changeTab(key) {
        console.log("change key!");
        console.log(key);
    }

    render() {

        const { currentMod } = this.props;
        return (
            <div>
                {
                    currentMod === null ?  <div> Sorry :( Mod is unavailable</div> :
                    <Card bordered={false} style={{width: '100%'}} title = {null}>
                        <Row>
                            <h2> {currentMod.title + "(" + moment(currentMod.publish_date).format("MMM Do YY") + ")"}</h2>
                        </Row>
                        <Row>  <span style={{fontWeight : "bold"}}>Link: </span><a href={currentMod.url}> {currentMod.url} </a></Row>
                        <Row>
                            <Col span={8} >
                                <span style={{fontWeight : "bold"}}>Download:</span> {numeral(currentMod.downloads).format('0,0')}
                            </Col>

                            <Col span={8} >
                                <span style={{fontWeight : "bold"}}> Favorite:</span> {numeral(currentMod.favourited).format('0,0')}
                            </Col>
                            <Col span={8}>
                                <span style={{fontWeight : "bold"}}>Game Version :</span> {currentMod.game_version}
                            </Col>

                        </Row>
                        <Row>
                            <Col span={8} >
                                <span style={{fontWeight : "bold"}}>View: </span> {numeral(currentMod.views).format('0,0')}
                            </Col>
                            <Col span={8} >
                                <span style={{fontWeight : "bold"}}>Thanks: </span> {numeral(currentMod.thanks).format('0,0')} </Col>
                            <Col span={8}>
                                <span style={{fontWeight : "bold"}}>Creator : </span> <a href={"http://modthesims.info" + currentMod.artist_url}>  {currentMod.artist}
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <span style={{fontWeight : "bold"}}>Keywords :</span> {currentMod.keywords === null || currentMod.keywords === undefined  ? "None" :
                                Object.keys(currentMod.keywords).map((key, index) => {
                                    if(index <= 9) return key + ", "
                                })
                            }
                        </Row>
                        <Row>  <span style={{fontWeight : "bold"}}>Pack Required :</span> {currentMod.pack_requirement === undefined || currentMod.pack_requirement === null ? "None" : currentMod.pack_requirement.map(pack => {
                            return pack + ", "
                        })} </Row>
                        <Row> <span style={{fontWeight : "bold"}}>Life Cycle : </span></Row>
                        <Row>
                            <Col >
                                {this.renderTimeSeriesData(currentMod)}
                            </Col>
                        </Row>
                        <Row>
                            <Tabs onChange={this.changeTab} type="card" defaultActiveKey="Description">
                                <TabPane tab="Description" key="Description">
                                    <div className="scroll-text"> {currentMod.description}</div>
                                </TabPane>
                                <TabPane tab="Comments" key="Comments">
                                    <div className="scroll-text">
                                        {currentMod.comments === null || currentMod.comments === undefined ? "No Data Available :(" :currentMod.comments.map(comment => {
                                            return <div> comment
                                                <Divider />
                                            </div>
                                        })}
                                    </div>
                                </TabPane>
                                <TabPane tab="Tag & Type" key="Tag&Type">
                                    <div className="scroll-text">
                                        <span style={{fontWeight : "bold"}}>Type :</span>
                                        {currentMod.types === null || currentMod.types === undefined ? "No Data Available :(" :
                                            currentMod.types.map(type => {
                                                return type + ", "
                                            })} <br/>
                                        <span style={{fontWeight : "bold"}}>Tags :</span>
                                        {currentMod.tags === null || currentMod.tags === undefined  ? "No Data Available :(" :currentMod.tags.map(tag => {
                                            return tag + ", "
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
