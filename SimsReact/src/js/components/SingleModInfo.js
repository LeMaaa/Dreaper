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
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <Card  title= {this.props.currentMod.title} style={{ width: '100%' }}>
                    <Row>
                        <Col span={12}>
                            Creator : {this.props.currentMod.artist}
                            <br/>
                            Publish Date : {this.props.currentMod.publish_date}
                            <br/>
                            Download : {this.props.currentMod.downloads}
                            <br/>
                            View : {this.props.currentMod.views}
                            <br/>
                            Favorite : {this.props.currentMod.favourited}
                            <br/>
                            Thanks : {this.props.currentMod.thanks}
                        </Col>

                        <Col span = {12}>
                            Keywords : {this.props.currentMod.keywords === null ?
                                        "None" : this.props.currentMod.keywords[0] + ", " + this.props.currentMod.keywords[1]}
                            <br/>
                            Type : {this.props.currentMod.types !== null && this.props.currentMod.types.length > 2
                                    ? this.props.currentMod.types[0]  + "," + this.props.currentMod.types[1] : "None"}
                            <br/>
                            Game Version : {this.props.currentMod.game_version}
                            <br/>
                            Pack Required : {this.props.currentMod.pack_requirement}

                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <TimeSeriesData itemForTimeSeriesData = {this.props.currentMod.time_series_data}/>
                    </Row>
                    <Divider />
                    <Row>
                        <Collapse accordion>
                            <Panel header = "Description" key="description">
                                <div className="scroll-text"> {this.props.currentMod.description}</div>
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
