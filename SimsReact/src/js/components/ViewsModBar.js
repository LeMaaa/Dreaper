/**
 * Created by lema on 2018/4/8.
 */

import React from 'react';
import eventProxy from 'react-eventproxy'

import { List, Avatar, Progress, Button  } from 'antd';



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



    render () {

        return (
            <List
                itemLayout = "horizontal"
                dataSource = {this.props.mods.sort(function(a, b){return b.views - a.views})}
                renderItem = {(item, index) => (
                    <List.Item actions={[<Button key = {index} icon = "bar-chart" onClick={(e) => this.showModDetail(item)}/>]}>
                        <List.Item.Meta
                            avatar={<Avatar> {index + 1}  </Avatar>}
                            title={<a>{item.title}</a>}
                            description = {<Progress percent={item.views / this.props.totalViews * 100} format={() =>item.views} />}
                        />
                    </List.Item>
                )}
            />

        );
    }
};

export default ViewsModBar;


