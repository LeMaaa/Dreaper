/**
 * Created by lema on 2018/4/8.
 */

import React from 'react';
import eventProxy from 'react-eventproxy'
import numeral from 'numeral'

import { List, Avatar, Progress, Button  } from 'antd';

const COLORS = ['#0088FE', '#00C49F', '#c85bff', '#FFBB28', '#FF8042', '#ff47d1', '#6dbcb3','#ff6d70', '#3b41dd', '#06d0db',
    '#e82573', '#2c6587', '#263163', '#97a5e5' ,'#ed9044', '#a86f72'];

class ViewsModBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
        this.showModDetail = this.showModDetail.bind(this);
    }

    showModDetail(item){
        console.log("mod detail");
        console.log(item);
        eventProxy.trigger("ChangeMod", item)

    }

    assignColor(item) {
        if(this.props.keywordPieRanking === null || this.props.keywordPieRanking === undefined) {
            console.log("color default")
            return "#50E3C2";
        } else {
            for(let i = 0; i < this.props.keywordPieRanking.length - 1; i++) {
                if(item.keywords.hasOwnProperty(this.props.keywordPieRanking[i].keyword)) {
                    return this.props.keywordPieRanking[i].color;
                }
            }
            return this.props.keywordPieRanking[this.props.keywordPieRanking.length - 1].color;
        }
    }

    render () {
        let that = this;
        return (
            <List
                itemLayout = "horizontal"
                dataSource = {this.props.mods.sort(function(a, b){return b.views - a.views})}
                renderItem = {(item, index) => (
                    <List.Item onClick={(e) => this.showModDetail(item)}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: that.assignColor(item) }}> {index + 1}  </Avatar>}
                            title={<a>{item.title}</a>}
                            description = {<Progress percent={item.views / this.props.totalViews * 100} format={() => numeral(item.views).format('0,0')} />}
                        />
                    </List.Item>
                )}
            />

        );
    }
};

export default ViewsModBar;


