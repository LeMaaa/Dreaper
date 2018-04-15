/**
 * Created by lema on 2018/4/12.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Badge, Button,Tag, Row} from "antd";

import SearchBarRowTopMod from './SearchBarRowTopMod';

export default class SearchBoxTopMod extends React.Component {
    /* props required:
     entries : either keyword or creator entries -- array
     */
    constructor(props) {
        super(props);
        this.state = {
            items : [],
        }

        this.renderTopModsList = this.renderTopModsList.bind(this);
    }

    renderTopModsList(entries) {
        return entries.map((entry, index) => {
                        return <Row  key = {index} >
                            <SearchBarRowTopMod entry = {entry} index = {entry.rank}/>
                        </Row>
                    });
    }

    render() {
        const { entries } = this.props;
        return (
            <div>
                {this.renderTopModsList(entries)}
            </div>
        );
    }
}





