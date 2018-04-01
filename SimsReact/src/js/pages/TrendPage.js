import React from 'react';

import LineChartWithTimeRange from '../components/LineChartWithTimeRange';
import PieChart from '../components/KeywordPieChart';
import NumOfRecordsByMonth from '../components/NumOfRecordsByMonth';
import StatsInfo from '../components/StatsInfo'
import TimeSeriesData from '../components/TimeSeriesData'

class TrendPage extends React.Component{

    render () {
        return (
            <div>
                <LineChartWithTimeRange />
                <StatsInfo/>

            </div>
        );
    }
};

export default TrendPage;

