/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import axios from 'axios';

import {PieChart, Pie} from 'recharts';

class TwoLevelPieChart extends React.Component {

    render () {
        return (
            <PieChart width={800} height={400}>
                <Pie data={this.props.item.downloads} cx={200} cy={200} outerRadius={60} fill="#8884d8"/>
                <Pie data={this.props.item.views} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
            </PieChart>
        );
    }

}



export default TwoLevelPieChart;
