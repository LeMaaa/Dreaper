import React from 'react';

import ModWrapper from '../components/ModWrapper';
import LineChartWithTimeRange from '../components/LineChartWithTimeRange';
import PieChart from '../components/PieChart';
import NumOfRecordsByMonth from '../components/NumOfRecordsByMonth';

class KeywordsPage extends React.Component{

    render () {
        return (
            <div>
                <PieChart />
            </div>
        );
    }
};

export default KeywordsPage;

