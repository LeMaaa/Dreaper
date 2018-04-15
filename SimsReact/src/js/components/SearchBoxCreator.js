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

        this.filterList = this.filterList.bind(this);
        this.renderCreatorList = this.renderCreatorList.bind(this);
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

    renderCreatorList(entries) {

        return (<List
            itemLayout="horizontal"
            dataSource={entries}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={ <Badge style={{ backgroundColor: '#1890ff' }} count={item.rank}/>}
                  title={item['_id']}
                  description={"Downloads: " + item.value.downloads}
                />
              </List.Item>
            )}
          />)
        // return entries.map((entry, index) => {
        //                 return <Row  key = {index} >
        //                     <SearchBarRowCreator entry = {entry} index = {entry.rank}/>
        //                 </Row>
        //             });
    }



    render() {
        const { entries } = this.props;
        return (
            <div>
                {this.renderCreatorList(entries)}
            </div>
        );
    }
}



