/**
 * Created by lema on 2018/4/12.
 */
/**
 * Created by lema on 2018/4/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Badge, Button, Tag, Row, List} from "antd";


import SearchBarRowKeyword from './SearchBarRowKeyword';


export default class SearchBoxKeyword extends React.Component {
    /* props required:
     entries : either keyword or creator entries -- array
     */
    constructor(props) {
        super(props);
        this.state = {
            items : [],
        }

        this.renderKeywordList = this.renderKeywordList.bind(this)
    }

    componentWillRe() {
        console.log("logs")
        console.log(this.props.entries)
    }

    renderKeywordList(entries) {

        if (entries.length === 0) {
            return (<div> No matching record found! </div>);
        }
        return entries.map( entry =>
            <SearchBarRowKeyword key = {entry._id} index = {entry.rank} entry = {entry}
                                 totalModsNum = {this.props.totalModsNum}
                                 startTime = {this.props.startTime} endTime = {this.props.endTime}/> )

    }


    render() {
        const { entries } = this.props;
        return (
            <div className="scrollSearch">
                <List>
                {this.renderKeywordList(entries)}
                </List>
            </div>
        );
    }
}


