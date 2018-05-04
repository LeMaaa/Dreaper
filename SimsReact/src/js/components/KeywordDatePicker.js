/**
 * Created by lema on 2018/4/2.
 */

import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy'
import { DateRangePicker } from 'react-dates';


export default class KeywordDatePicker extends React.Component {



    constructor() {
        super();
        this.onDatesChange = this.onDatesChange.bind(this);

        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
        };
    }


    onDatesChange(e) {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        this.updateModForInputTimeRange();
    }

    changeKeyWordMod(entry){
        eventProxy.trigger('changeKeyWordMod', entry);
    }

    updateModForInputTimeRange(e)  {
        e.preventDefault();

        axios.post('http://localhost:3000/getKeyWordWithThreshold', {
            startTime : this.state.startDate,
            endTime : this.state.endDate
        }).then((result) => {
                this.changeKeyWordMod(result.data);
        });
    }

    isOutsideRange() {
        return false;
    }

    render() {
        return (
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
        );
    }
}





