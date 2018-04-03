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

    updateSearchTerms(event) {
        console.log("updating search terms");
        const keyword = this.state.keyword;
        const startDateTimestamp = new Date(this.state.startTime).getTime() / 1000;
        const endDateTimestamp = new Date(this.state.endTime).getTime() / 1000;

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
                  endDate={this.state.endDate}
                  onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
                  focusedInput={this.state.focusedInput}
                  onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                />                
                <FormControl>
                  <InputLabel htmlFor="keyword">keyword</InputLabel>
                  <Input id="keyword" value={this.state.keyword} onChange={this.handleKeywordChange} />
                </FormControl>

                <br />

                <FormControl>
                  <InputLabel htmlFor="startTime">Start Date</InputLabel>
                  <Input id="startTime" value={this.state.startTime} onChange={this.handleStartTimeChange} />
                </FormControl>

                <br /> 

                <FormControl>
                  <InputLabel htmlFor="endTime">End Date</InputLabel>
                  <Input id="endTime" value={this.state.endTime} onChange={this.handleEndTimeChange} />
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



