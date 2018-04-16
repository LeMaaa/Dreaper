/**
 * Created by lema on 2018/4/12.
 */
/**
 * Created by lema on 2018/4/12.
 */
/**
 * Created by lema on 2018/4/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import eventProxy from 'react-eventproxy';


import {Badge, Button,Tag, List, Modal, Row, Col, Card} from "antd";
const Item = List.Item;

import SingleModPopUp from '../components/SingleModPopUp';


export default class SearchBarRowTopMod extends React.Component {
    /* props required:
     index : index of current row
     entry : either keyword or creator entry
     */
    constructor(props) {
        super(props)
        this.state = {
            visible : false,
        }
        this.show = this.show.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    handleOk(e) {
        console.log(e);
        this.setState({
            'visible': false,
        });
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
            'visible': false,
        });
    }

    show(e,val) {
        console.log("add creator")
        console.log(val);
        e.preventDefault();
        this.setState({
            'visible': true,
        });
    }


    render() {
        return (
            <div>
                {/*<Button type="dashed" onClick = {this.addCreator}>{this.props.entry._id}</Button>*/}
                <List.Item onClick = {(e) => this.show(e,this.props.index)}>
                             <List.Item.Meta
                           avatar={ <Badge style={{ backgroundColor: '#1890ff' }} count={this.props.entry.rank}/>}
                           title={this.props.entry['title']}
                           description= {"Downloads: " + this.props.entry['downloads']}
                         />
                </List.Item>
                <Modal
                    width = {720}
                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Row>
                        <SingleModPopUp currentMod = {this.props.entry}/>
                    </Row>

                </Modal>
            </div>
        );
    }
}


