/**
 * Created by lema on 2018/4/12.
 */
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

import { Avatar, Card, Icon, Button, Modal, Row, Col, Badge, Divider } from 'antd';
const { Meta } = Card;

import SingleModInfo from '../components/SingleModInfo' ;
import DownloadModBar from "./DownloadModBar";
import ViewsModBar from "./ViewsModBar";
import CircleOnPanel from './CircleOnPanel'

import KeywordPieChart from "./KeywordPieChart";
import KeywordCircleOnPanel from "./CircleOnPanel";




class ModCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mods : [],
            mod : null,
            visible: false,
            noTitleKey: 'Downloads',
            currentMod : null,

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
    }

    showModal(e){
        // e.preventDefault();
        this.setState({
            visible: true,
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



    render () {
        return (
            <div className="CreatorCircle">
                <Card  style={{ width: 250 }}>

                    <Badge count = {this.props.index}/>
                    <CircleOnPanel index = {this.props.index} name = {this.props.mod.title} onClick={this.showModal}/>
                    <span className="textUnderCircle"> {this.props.mod.downloads} downloads </span>

                </Card>
                <Modal
                    title = {"No." + this.props.index + "  -  " + this.props.mod.title}

                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {1100}
                >
                    <Row type="flex" justify="space-around">
                        <Col span = {8}>
                            {/*<KeywordPieChart items = {this.state.item}/>*/}
                        </Col>

                        {/*<Col span={8}>*/}
                            {/*<Card*/}
                                {/*style={{ width: '100%' }}*/}
                                {/*tabList={this.state.tabListNoTitle}*/}
                                {/*activeTabKey={this.state.noTitleKey}*/}
                                {/*onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}*/}
                            {/*>*/}
                                {/*{this.state.contentListNoTitle[this.state.noTitleKey]}*/}
                            {/*</Card>*/}
                        {/*</Col>*/}

                        <Col span = {8}>
                            <SingleModInfo currentMod = {this.props.mod}/>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
};

export default ModCard;



