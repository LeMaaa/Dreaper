/**
 * Created by lema on 2018/4/2.
 */
import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy';

import TimeSeriesData from '../components/TimeSeriesData'

import {Card, Row, Col, Collapse, Divider} from 'antd'
const Panel = Collapse.Panel;



class SingleModInfo extends React.Component {
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
        return (
            <div>
                <Card title= {currentMod.title} style={{ width: '100%' }}>
                    <Row>
                        <Col span={12}>
                            Creator : {currentMod.artist}
                            <br/>
                            Publish Date : {currentMod.publish_date}
                            <br/>
                            Download : {currentMod.downloads}
                            <br/>
                            View : {currentMod.views}
                            <br/>
                            Favorite : {currentMod.favourited}
                            <br/>
                            Thanks : {currentMod.thanks}
                        </Col>

                        <Col span = {12}>
                            Keywords : {currentMod.keywords === null ?
                                        "None" : currentMod.keywords[0] + ", " + currentMod.keywords[1]}
                            <br/>
                            Type : {currentMod.types !== null && currentMod.types.length > 2
                                    ? currentMod.types[0]  + "," + currentMod.types[1] : "None"}
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
                        <Collapse accordion>
                            <Panel header = "Description" key="description">
                                <div className="scroll-text"> {currentMod.description}</div>
                            </Panel>
                            <Panel header="Comments" key="comments">
                            </Panel>
                        </Collapse>
                    </Row>

                </Card>
            </div>
        );
    }
}

export default SingleModInfo;
