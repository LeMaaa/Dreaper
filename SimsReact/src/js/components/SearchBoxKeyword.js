/**
 * Created by lema on 2018/4/12.
 */
/**
 * Created by lema on 2018/4/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Badge, Button,Tag, Row} from "antd";

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

        this.filterList = this.filterList.bind(this);
        this.renderKeywordList = this.renderKeywordList.bind(this)
    }

    componentWillRe() {
        console.log("logs")
        console.log(this.props.entries)
    }

    componentWillReceiveProps() {

    }

    filterList(event) {
        var updatedList = this.props.entries;
        updatedList = updatedList.filter(function(item){
            console.log("event.target.value");
            console.log(event.target.value);
            // return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({"items": updatedList});
    }

    renderKeywordList(entries) {
        return entries.map((entry, index) => {
                        return <Row  key = {index} >
                            <SearchBarRowKeyword entry = {entry} index = {entry.rank}/>
                        </Row>
                    });
    }


    render() {
        const { entries } = this.props;
        return (
            <div>
                {this.renderKeywordList(entries)}
            </div>
        );
    }
}


