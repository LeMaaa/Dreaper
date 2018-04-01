/**
 * Created by lema on 2018/3/31.
 */

/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import eventProxy from 'react-eventproxy'
import {Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart} from 'Recharts';

const colors = ['red', 'green', 'pink', 'yellow', 'black', 'blue', 'pink', 'brown', 'grey', 'ruby'];

class TimeSeriesData extends React.Component{
    constructor(props) {
        super(props);
            // this.state = {
            //     itemForTimeSeriesData : {},
            // }

    }


    render () {

        return (
            <BarChart width={600} height={300} data={this.props.itemForTimeSeriesData}
                      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />

                <Bar dataKey="downloads" stackId="a" fill= '#97a5e5' />
                <Bar dataKey="favourited" stackId="a" fill="#50ca9d" />
                <Bar dataKey="thanks" stackId="a" fill="#ff6666" />
                <Bar dataKey="views" stackId="a" fill="#FFBB28" />
            </BarChart>

        );
    }
};

export default TimeSeriesData;

