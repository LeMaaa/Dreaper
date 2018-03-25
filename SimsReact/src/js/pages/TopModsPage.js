import React from 'react';

import ModWrapper from '../components/ModWrapper';
import LineChartWithTimeRange from '../components/LineChartWithTimeRange';
import PieChart from '../components/PieChart';
import NumOfRecordsByMonth from '../components/NumOfRecordsByMonth';

class TopModsPage extends React.Component{

    render () {
        return (
            <div>
                <LineChartWithTimeRange />
            </div>
        );
    }
};

export default TopModsPage;

