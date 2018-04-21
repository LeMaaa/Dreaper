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

            console.log(timestamp1);
            console.log(timestamp2);
            return timestamp1 - timestamp2;
        }
        if (mod.time_series_data !== null && mod.time_series_data.length > 0)
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
                    <Card title={currentMod.title} style={{width: '100%'}}>
                        <Row>
                            <Col span={12}>
                                Creator : {currentMod.artist}
                                <br/>
                                Publish Date : {moment(currentMod.publish_date).format("MMM Do YYYY")}
                                <br/>
                                Download : {numeral(currentMod.downloads).format('0,0')}
                                <br/>
                                View : {numeral(currentMod.views).format('0,0')}
                                <br/>
                                Favorite : {numeral(currentMod.favourited).format('0,0')}
                                <br/>
                                Thanks : {numeral(currentMod.thanks).format('0,0')}
                            </Col>

                            <Col span={12}>
                                Keywords : {currentMod.keywords === null ?
                                "None" : currentMod.keywords[0] + ", " + currentMod.keywords[1]}
                                <br/>
                                Type : {currentMod.types !== null && currentMod.types.length > 2
                                ? currentMod.types[0] + "," + currentMod.types[1] : "None"}
                                <br/>
                                Game Version : {currentMod.game_version}
                                <br/>
                                Pack Required : {currentMod.pack_requirement}

                            </Col>
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

                            {/*<Collapse accordion>*/}
                            {/*<Panel header = "Description" key="description">*/}
                            {/*<div className="scroll-text"> {currentMod.description}</div>*/}
                            {/*</Panel>*/}
                            {/*<Panel header="Comments" key="comments">*/}
                            {/*</Panel>*/}
                            {/*</Collapse>*/}
                        </Row>
                    </Card>
                }
            </div>
        );
    }
}

export default SingleModInfo;
