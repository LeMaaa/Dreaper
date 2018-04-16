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

        return entries.map( entry =>
            <SearchBarRowKeyword key = {entry._id} index = {entry.rank} entry = {entry}
                                 startTime = {this.props.startTime} endTime = {this.props.endTime}/> )
        //
        // return (<List
        //     itemLayout="horizontal"
        //     dataSource={entries}
        //     renderItem={item => (
        //       <List.Item>
        //         <List.Item.Meta
        //           avatar={ <Badge style={{ backgroundColor: '#1890ff' }} count={item.rank}/>}
        //           title={item['_id']}
        //           description={"Mods: " + item['value']}
        //         />
        //       </List.Item>
        //     )}
        //   />)
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


