/**
 * Created by lema on 2018/4/12.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Badge, Button, Tag, Row, List} from "antd";

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

        return (<List
            itemLayout="horizontal"
            dataSource={entries}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={ <Badge style={{ backgroundColor: '#1890ff' }} count={item.rank}/>}
                  title={item['title']}
                  description={"Downloads: " + item['downloads']}
                />
              </List.Item>
            )}
          />)
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





