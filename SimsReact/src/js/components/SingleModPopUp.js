/**
 * Created by lema on 2018/4/15.
 */
/**
 * Created by lema on 2018/4/2.
 */
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import eventProxy from 'react-eventproxy';
import numeral from 'numeral';

import TimeSeriesData from '../components/TimeSeriesData'

import {Card, Row, Col, Collapse, Divider, Tabs} from 'antd'
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;




class SingleModPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.renderTimeSeriesData = this.renderTimeSeriesData.bind(this);
    }

    renderTimeSeriesData(mod) {
        const sort_by_date = (a, b) => {
            const timestamp1 = Date.parse(a['date'])/1000;
            const timestamp2 = Date.parse(b['date'])/1000;

            console.log(timestamp1);
            console.log(timestamp2);
            return timestamp1 - timestamp2;
        }
        if (mod.time_series_data !== null && mod.time_series_data.length > 0)
            return <TimeSeriesData itemForTimeSeriesData = {mod.time_series_data.sort(sort_by_date)} />;
        else
            return (<p> Sorry, this mod does not contain time series data </p>);

    }

    render() {

        const { currentMod } = this.props;
        var  keywordsToShow;

        return (
            <div>
                {
                    currentMod === null ? <div> Sorry :( Mod is unavailable</div> :
                    <Card title={currentMod.title + "(" + moment(currentMod.publish_date).format("MMM Do YY") + ")"}
                          style={{width: '100%'}} bordered={false}>
                        <Row> Link : <a href={currentMod.url}> {currentMod.url} </a></Row>
                        <Row>
                            <Col span={6} style={{background: '#bec3c6'}}> Download
                                : {numeral(currentMod.downloads).format('0,0')}
                                <Divider type="vertical"/>
                            </Col>

                            <Col span={6} style={{background: '#bec3c6'}}>View
                                : {numeral(currentMod.views).format('0,0')}
                                <Divider type="vertical"/>
                            </Col>

                            <Col span={6} style={{background: '#bec3c6'}}> Favorite
                                : {numeral(currentMod.favourited).format('0,0')}
                                <Divider type="vertical"/>
                            </Col>
                            <Col span={6} style={{background: '#bec3c6'}}> Thanks
                                : {numeral(currentMod.thanks).format('0,0')} </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                Creator : {currentMod.artist}
                            </Col>
                            <Col span={12}>
                                Game Version : {currentMod.game_version}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Keywords : {currentMod.keywords === null ? "None" :
                                currentMod.keywords[Object.keys(currentMod.keywords)[0]] + ", "
                                + currentMod.keywords[Object.keys(currentMod.keywords)[1]]}
                            </Col>
                            <Col> Pack Required : {currentMod.pack_requirement}</Col>
                        </Row>

                        <Divider />
                        <Row>
                            {this.renderTimeSeriesData(currentMod)}
                        </Row>
                        <Divider />
                        <Row>
                            <Tabs onChange={this.changeTab} type="card" defaultActiveKey="Description">
                                <TabPane tab="Description" key="Description">
                                    <div className="scroll-text"> {currentMod.description}</div>
                                </TabPane>
                                <TabPane tab="Comments" key="Comments">
                                    {currentMod.comments.map(comment => {
                                        return <div> comment
                                            <Divider />
                                        </div>
                                    })}
                                </TabPane>
                                <TabPane tab="Tag & Type" key="Tag&Type">
                                    <div>
                                        Type : {currentMod.types.map(type => {
                                        return type + ", "
                                    })} <br/>
                                        Tags : {currentMod.tags.map(tag => {
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

export default SingleModPopUp;

