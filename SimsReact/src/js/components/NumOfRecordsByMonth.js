/**
 * Created by lema on 2018/2/28.
 */
/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import eventProxy from 'react-eventproxy'

import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from 'Recharts';


class NumOfRecordsByMonth extends React.Component{


    render () {
        return (
            <LineChart width={600} height={300} data={this.props.itemsPerMonth}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="time"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="num" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        );
    }
};

export default NumOfRecordsByMonth;

