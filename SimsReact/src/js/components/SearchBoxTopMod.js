/**
 * Created by lema on 2018/4/12.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Badge, Button, Tag, Row, List, Modal} from "antd";

import SearchBarRowTopMod from './SearchBarRowTopMod';

export default class SearchBoxTopMod extends React.Component {
    /* props required:
     entries : either keyword or creator entries -- array
     */
    constructor(props) {
        super(props);
        this.state = {
            items : [],
            visible : [],
        }

        this.renderTopModsList = this.renderTopModsList.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    showModal(e){
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

    renderTopModsList(entries) {
        return entries.map( (entry, index) =>
             <SearchBarRowTopMod key = {entry._id} index = {index + 1} entry = {entry}/>
        );
    }

    render() {
        const { entries } = this.props;
        return (
            <div className="scroll-search-mods">
                <List>
                {this.renderTopModsList(entries)}
                </List>
            </div>
        );
    }
}





