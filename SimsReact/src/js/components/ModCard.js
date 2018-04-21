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
import numeral from 'numeral'

import { Avatar, Card, Icon, Button, Modal, Row, Col, Badge, Divider } from 'antd';
const { Meta } = Card;

import SingleModInfo from '../components/SingleModInfo' ;
import SingleModPopUp from '../components/SingleModPopUp';
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
                <Card onClick={this.showModal} >

                    <Badge style={{ backgroundColor: '#1890ff' }} count = {this.props.index}/>
                    {/*<CircleOnPanel index = {this.props.index} name = {this.props.mod.title} />*/}
                    {this.props.mod.title} <br/>
                    <span className="textUnderCircle"> {numeral(this.props.mod.downloads).format('0,0')} downloads </span>

                </Card>
                <Modal
                    title = {null}
                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {720}
                >

                    <SingleModPopUp currentMod = {this.props.mod}/>


                </Modal>
            </div>
        );
    }
};

export default ModCard;



