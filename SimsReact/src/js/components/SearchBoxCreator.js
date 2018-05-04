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

import {Badge, Button, Tag, Row, List} from "antd";

import SearchBarRowCreator from './SearchBarRowCreator';


export default class SearchBoxCreator extends React.Component {
    /* props required:
     entries : either keyword or creator entries -- array
     */
    constructor(props) {
        super(props);
        this.state = {
            items : [],
        }

        this.renderCreatorList = this.renderCreatorList.bind(this);
    }


    renderCreatorList(entries) {
        return entries.map( entry =>
            <SearchBarRowCreator key = {entry._id} index = {entry.rank} creatorEntry = {entry}
                                 startTime = {this.props.startTime} endTime = {this.props.endTime}/> )
    }



    render() {
        const { entries } = this.props;
        return (
            <div className="scrollSearch">
                <List>
                    {this.renderCreatorList(entries)}
                </List>
            </div>
        );
    }
}



