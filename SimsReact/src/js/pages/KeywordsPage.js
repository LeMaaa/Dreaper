import React from 'react';
import axios from 'axios';

import KeywordPieChart from '../components/KeywordPieChart';
import KeywordTimeRange from '../components/KeywordTimeRange';
import eventProxy from 'react-eventproxy'


class KeywordsPage extends React.Component{


    constructor(props) {
        super(props)
        this.state = {
            itemsByKey:[],
            startTime: null,
            endTime: null,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/downloadsOfKey', {
            params: {
                startTime: this.state.startTime === null ? "Mar 1994" : this.state.startTime,
                endTime: this.state.endTime === null ? "Dec 2020" : this.state.endTime,
            }
        })
            .then(res => {
                console.log("received data");
                // console.log(res.data);
                this.setState({ 'itemsByKey' : this.state.itemsByKey.concat(res.data)})
            });


            // 监听事件
            eventProxy.on('changeKeyWordMod', (entry) => {
                this.setState({
                    'itemsByKey' : entry
                });
            });
    }

    render () {
        return (
            <div>
                    <KeywordTimeRange />
                    <KeywordPieChart itemsByKey = {this.state.itemsByKey} />
            </div>
        );
    }
};

export default KeywordsPage;

