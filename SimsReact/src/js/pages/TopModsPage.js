import React from 'react';

import ModWrapper from '../components/ModWrapper';
import LineChartWithTimeRange from '../components/LineChartWithTimeRange';
import PieChart from '../components/KeywordPieChart';
import NumOfRecordsByMonth from '../components/NumOfRecordsByMonth';
import BarChartPopularMods from '../components/BarChartPopularMods';
import ModDetailsCard from '../components/ModDetailsCard'
import StatsInfo from '../components/StatsInfo'

import { DateRangePicker } from 'react-dates';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';


export default class TopModsPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            keyword: "trait",
            startTime: "",
            endTime: "",
            startTimestamp: "",
            endTimestamp: "",
            searchKeyword: "",
            searchStartTime: "",
            searchEndTime: "",
            startDate: null,
            endDate: null,
            focusedInput: null
        };

        this.handleKeywordChange = this.handleKeywordChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.updateSearchTerms = this.updateSearchTerms.bind(this);
        this.isOutsideRange = this.isOutsideRange.bind(this);

    }

    handleKeywordChange(event) {
        this.setState({ keyword: event.target.value });
    };

    handleStartTimeChange(event) {
        // const startDateTimestamp = new Date(event.target.value).getTime() / 1000;
        console.log(event.target.value);
        this.setState({ startTime: event.target.value });
        // this.setState({ startTimestamp: startDateTimestamp });

    }

    handleEndTimeChange(event) {
        // const endDateTimestamp = new Date(event.target.value).getTime() / 1000;
        this.setState({ endTime: event.target.value });
        // this.setState({ endTimestamp: endDateTimestamp });
    }

    isOutsideRange() {
        return false;
    }

    updateSearchTerms(event) {
        console.log("updating search terms");

        const keyword = this.state.keyword;
        const startDateTimestamp = this.state.startDate.format('X');
        const endDateTimestamp = this.state.endDate.format('X');

        this.setState({
            searchStartTime: startDateTimestamp,
            searchEndTime: endDateTimestamp,
            searchKeyword: keyword
        });
    }

    render () {
        return (
            <div className="container">
                <h1> The Most Popular Mods </h1>

                <DateRangePicker
                  startDate={this.state.startDate}
                  startDateId="1"
                  endDate={this.state.endDate}
                  endDateId="2"
                  isOutsideRange={this.isOutsideRange}
                  onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
                  focusedInput={this.state.focusedInput}
                  onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                />

                <br />

                <FormControl>
                  <InputLabel htmlFor="keyword">keyword</InputLabel>
                  <Input id="keyword" value={this.state.keyword} onChange={this.handleKeywordChange} />
                </FormControl>

                <br />

                <Button onClick={this.updateSearchTerms} variant="raised" color="primary">
                    Search
                </Button>

                <BarChartPopularMods startTimestamp={this.state.searchStartTime} 
                    endTimestamp={this.state.searchEndTime} 
                    keywords={this.state.searchKeyword}
                />
                <StatsInfo/>
            </div>


        );
    }
};



