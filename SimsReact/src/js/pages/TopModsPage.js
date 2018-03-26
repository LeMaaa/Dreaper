import React from 'react';

import ModWrapper from '../components/ModWrapper';
import LineChartWithTimeRange from '../components/LineChartWithTimeRange';
import PieChart from '../components/PieChart';
import NumOfRecordsByMonth from '../components/NumOfRecordsByMonth';
import BarChartPopularMods from '../components/BarChartPopularMods';

class TopModsPage extends React.Component{

    render () {
        return (
            <div>
                <h1> The Most Popular Mods </h1>
{/*                <LineChartWithTimeRange />
*/}
                <BarChartPopularMods />
            </div>
        );
    }
};

export default TopModsPage;

