import React from 'react';

import LineChartWithTimeRange from '../components/LineChartWithTimeRange';
import PieChart from '../components/PieChart';
import NumOfRecordsByMonth from '../components/NumOfRecordsByMonth';

class TrendPage extends React.Component{

    render () {
        return (
            <div>
                <NumOfRecordsByMonth />
            </div>
        );
    }
};

export default TrendPage;

