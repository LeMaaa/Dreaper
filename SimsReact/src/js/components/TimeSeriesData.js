/**
 * Created by lema on 2018/3/31.
 */

/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import moment from 'moment';
import eventProxy from 'react-eventproxy'
import {Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Line, LineChart} from 'Recharts';

const colors = ['red', 'green', 'pink', 'yellow', 'black', 'blue', 'pink', 'brown', 'grey', 'ruby'];

class TimeSeriesData extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const arr = this.props.itemForTimeSeriesData;
        console.log("aaa")
        let res = [];
        if(this.props.itemForTimeSeriesData === null || this.props.itemForTimeSeriesData.length === 0) return;
        let i = 0;
        // while(i < this.props.itemForTimeSeriesData.length) {
        //     if(i !== 0) {
        //         const ytd = moment(this.props.itemForTimeSeriesData[i - 1].date);
        //         const cur = moment(this.props.itemForTimeSeriesData[i].date)
        //         const today = moment(this.props.itemForTimeSeriesData[i - 1].date).add(1, 'days')
        //         if(cur === today) {
        //             res.push()
        //
        //         }
        //     }
        // }
    }

    render() {
        return (
            //<BarChart width={320} height={200} data={this.props.itemForTimeSeriesData}>
              //  <XAxis dataKey="date"/>
                //<YAxis/>
                //<CartesianGrid strokeDasharray="3 3"/>
                //<Tooltip/>
                //<Legend />

                //<Bar dataKey="downloads" stackId="a" fill= '#97a5e5' />
                //<Bar dataKey="favourited" stackId="a" fill="#50ca9d" />
                //<Bar dataKey="thanks" stackId="a" fill="#ff6666" />
                //<Bar dataKey="views" stackId="a" fill="#FFBB28" />
            //</BarChart>
            <LineChart width={400} height={260} data={this.props.itemForTimeSeriesData}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="downloads" stroke="#8884d8" dot={false} />
                <Line type="monotone" dataKey="views" stroke="#82ca9d" dot={false} />
            </LineChart>

        );
    }
}

export default TimeSeriesData;

