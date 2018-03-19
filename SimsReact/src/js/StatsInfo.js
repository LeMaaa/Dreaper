/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy';



class StatsInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            entry : null,
            image : "",
        }
    }

    componentDidMount() {
        // 监听事件
        eventProxy.on('displayModInfo', (entry) => {
            this.setState({
                entry,
                image : "http:" + entry['preview_image']
            });
        });
        console.log(this.state.entry)
    }

    render() {
        let item_stats = [];
        if(this.state.entry !== null && this.state.entry !== undefined) {
            item_stats = Object.keys(this.state.entry).map((key, i) => {

                if(key !== 'description') {
                    return (
                        <div className="item_stats" key={i}>
                            <span>{key} : {this.state.entry[key]}</span>
                        </div>
                    );
                }
            });
        }

        return (
            <div width={10}>
                {this.state.image !== "" ? <img src = {this.state.image} width={500} height={300} /> : null }
                {item_stats}
            </div>
        );
    }
}

export default StatsInfo;