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
import numeral from 'numeral'


import {Avatar, Badge, Button,Tag, List, Modal, Row, Col, Card} from "antd";
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
            modEntry : {}
        }
        this.show = this.show.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    handleOk(e) {

        this.setState({
            'visible': false,
        });
    }

    handleCancel(e) {

        this.setState({
            'visible': false,
        });
    }

    show(e,val) {
        e.preventDefault();
        axios.post('http://dreaper.etc.cmu.edu:3000/getHotModByName', {
            modName:  this.props.entry._id,
        })
            .then(res => {
                this.setState({ 'modEntry' : res.data})
            });
        this.setState({
            'visible': true,
        });
    }


    render() {
        return (
            <div>
                {/*<Button type="dashed" onClick = {this.addCreator}>{this.props.entry._id}</Button>*/}
                <List.Item className="custom-list-item mod-list-item" onClick = {(e) => this.show(e, this.props.index)}>
                             <List.Item.Meta
                           avatar={ <Avatar className="custom-avatar" > {this.props.index} </Avatar> }
                           title={this.props.entry['_id']}
                           // description= {"Downloads: " + numeral(this.props.entry['total']).format('0,0')}
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
                        <SingleModPopUp currentMod = {this.state.modEntry}/>
                    </Row>

                </Modal>
            </div>
        );
    }
}


