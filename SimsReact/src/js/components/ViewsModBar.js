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
        this.renderTitleWithBadges = this.renderTitleWithBadges.bind(this);
    }

    showModDetail(item){
        eventProxy.trigger("ChangeMod", item)

    }

    renderTitleWithBadges(item, keywordPieRanking) {

        const badges = (keywordPieRanking !== null && keywordPieRanking !== undefined) ? keywordPieRanking.map((entry, i) => { if (item.keywords.hasOwnProperty(entry.keyword)) {
                                return (<span className="custom-dot-badge ant-badge ant-badge-status ant-badge-not-a-wrapper"> 
                                    <span className="ant-badge-status-dot ant-badge-status-default" style={{backgroundColor: entry.color}}> </span>
                                    </span>)
                                } else {
                                    if (i === keywordPieRanking.length - 1 && keywordPieRanking[i].keyword === "other") {
                                        return (<span className="custom-dot-badge ant-badge ant-badge-status ant-badge-not-a-wrapper"> 
                                            <span className="ant-badge-status-dot ant-badge-status-default" style={{backgroundColor: entry.color}}> </span>
                                            </span>)
                                    }
                                }
                            }) : null;
        return (<div>
                 {badges}
                 <a> {item.title} </a>
            </div>)
    }

    assignColor(item) {
        if(this.props.keywordPieRanking === null || this.props.keywordPieRanking === undefined) {
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
                    <List.Item actions={[<p></p>]} onClick={(e) => this.showModDetail(item)}>
                        <List.Item.Meta
                           // avatar={<Avatar style={{ backgroundColor: that.assignColor(item) }}> {index + 1}  </Avatar>}
                            avatar={<Avatar> {index + 1}  </Avatar>}
                            title={this.renderTitleWithBadges(item, this.props.keywordPieRanking)}
                            description = {<Progress percent={item.views / this.props.totalViews * 100} format={() => numeral(item.views).format('0,0')} />}
                        />
                    </List.Item>
                )}
            />

        );
    }
};

export default ViewsModBar;


