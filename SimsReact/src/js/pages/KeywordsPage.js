import React from 'react';
import axios from 'axios';

import KeywordPieChart from '../components/KeywordPieChart';
import KeywordTimeRange from '../components/KeywordTimeRange';
import KeywordDatePicker from '../components/KeywordDatePicker'
import eventProxy from 'react-eventproxy'
import { DateRangePicker } from 'react-dates';


class KeywordsPage extends React.Component{


    constructor(props) {
        super(props)
        this.state = {
            // itemsByKey:[],
            startDate: null,
            endDate: null,
            focusedInput: null,
        }
    }

    // componentDidMount() {
    //     axios.get('http://localhost:3000/downloadsOfKey', {
    //         params: {
    //             startTime: this.state.startTime === null ? "Mar 1994" : this.state.startTime,
    //             endTime: this.state.endTime === null ? "Dec 2020" : this.state.endTime,
    //         }
    //     })
    //         .then(res => {
    //             console.log("received data");
    //             // console.log(res.data);
    //             this.setState({ 'itemsByKey' : this.state.itemsByKey.concat(res.data)})
    //         });
    //
    //
    //         // 监听事件
    //         eventProxy.on('changeKeyWordMod', (entry) => {
    //             this.setState({
    //                 'itemsByKey' : entry
    //             });
    //         });
    // }

    isOutsideRange() {
        return false;
    }

    render () {
        return (
            <div>
                <DateRangePicker
                    startDate={this.state.startDate}
                    startDateId="keyword_start_date_id"
                    endDate={this.state.endDate}
                    endDateId="keyword_end_date_id"
                    onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                    isOutsideRange={this.isOutsideRange}
                />
                <KeywordPieChart startTime = {this.state.startDate} endTime = {this.state.endDate} />
            </div>
        );
    }
};

export default KeywordsPage;

