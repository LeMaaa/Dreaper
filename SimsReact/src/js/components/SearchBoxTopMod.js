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
        this.showDetails = this.showDetails.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    showDetails(index) {
        console.log("click show modal  " );
        console.log(index);
        // this.setState({
        //     visible: true,
        // });

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
        return entries.map( entry =>
             <SearchBarRowTopMod key = {entry.title} index = {entry.rank} entry = {entry}/>
        );

        // return (<List
        //     itemLayout="horizontal"
        //     dataSource={entries}
        //     renderItem={(item,index) => (
        //       <List.Item onClick = {(e) => this.showDetails(index)}>
        //         <List.Item.Meta
        //           avatar={ <Badge style={{ backgroundColor: '#1890ff' }} count={item.rank}/>}
        //           title={item['title']}
        //           description={"Downloads: " + item['downloads']}
        //         />
        //           <Modal
        //               visible={this.state.visible}
        //               footer = {null}
        //               onOk={this.handleOk}
        //               onCancel={this.handleCancel}
        //           >  {item.title} </Modal>
        //       </List.Item>
        //     )}
        //   />)
    }

    render() {
        const { entries } = this.props;
        return (
            <div className="scrollSearch">
                <List>
                {this.renderTopModsList(entries)}
                </List>
            </div>
        );
    }
}





