import React from 'react';

import LineChartWithTimeRange from '../components/LineChartWithTimeRange';
import PieChart from '../components/KeywordPieChart';
import NumOfRecordsByMonth from '../components/NumOfRecordsByMonth';
import StatsInfo from '../components/StatsInfo'

class TrendPage extends React.Component{

    render () {
        return (
            <div>
                <NumOfRecordsByMonth />
                <StatsInfo/>

            </div>
        );
    }
};

export default TrendPage;

