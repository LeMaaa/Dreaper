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
        this.state = {
            timeSeriesData:[],
        }
        this.populateNewTimeSeriesData = this.populateNewTimeSeriesData.bind(this);
    }

    populateNewTimeSeriesData() {
        const arr = this.props.itemForTimeSeriesData;
        console.log("aaatime")
        let res = [];
        if(this.props.itemForTimeSeriesData === null || this.props.itemForTimeSeriesData.length === 0) return;
        let i = 1;
        let before = moment(this.props.itemForTimeSeriesData[0].date);

        while(i < this.props.itemForTimeSeriesData.length) {
            console.log("props",i, this.props.itemForTimeSeriesData[i].date)
            let cur = moment(this.props.itemForTimeSeriesData[i].date)
            let today = before.clone().add(1,"days");

            console.log("cur", cur.format("YYYY-MM-DD"));
            console.log("today", today.format("YYYY-MM-DD"));
            console.log("before", before.format("YYYY-MM-DD"));

            if(cur.format("YYYY-MM-DD") === today.format("YYYY-MM-DD") ) {
                console.log("==",this.props.itemForTimeSeriesData[i].date)
                res.push(this.props.itemForTimeSeriesData[i - 1]); // before
                before = cur.clone();
                i++;
            }else if (today.format("YYYY-MM-DD") < cur.format("YYYY-MM-DD")){
                console.log("!==",this.props.itemForTimeSeriesData[i].date)
                res.push({
                    date : moment(today).format("YYYY-MM-DD"),
                    downloads : 0,
                    views : 0,
                });
                before = today.clone();
            }else {
                before = today.clone();
                i++;
            }
        }
        if(i !== 1) {
            res.push( this.props.itemForTimeSeriesData[ this.props.itemForTimeSeriesData.length - 1]);
        }

        this.setState({"timeSeriesData" :  res});

        console.log("new time ", res);
    }

    componentDidMount() {
        // this.populateNewTimeSeriesData();

        // eventProxy.on("openTimeSeriesData", () => {
        //     console.log('trigger')
        //     this.populateNewTimeSeriesData();
        // });

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
            <LineChart width={400} height={230} data={this.props.itemForTimeSeriesData}
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

