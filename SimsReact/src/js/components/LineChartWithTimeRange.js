/**
 * Created by lema on 2018/3/15.
 */


import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy'
import { ResponsiveContainer, ComposedChart, Bar, Brush, Dot, Line, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList} from 'recharts';
import { Badge } from 'antd';

import TimeSeriesData from '../components/TimeSeriesData'

// pack release info, mapped to date
const labelInfoDay = {"03/31/2015": "EP01 Get to work (NA)",
    "04/02/2015": "EP01 Get to work (EU)",
    "12/08/2015": "EP02 Get together (NA)",
    "12/10/2015": "EP02 Get together (EU)",
    "11/01/2016": "EP03 City Living (NA)",
    "11/03/2016": "EP03 City Living (EU)",
    "11/10/2017": "EP04 Cats & Dogs",
    "01/13/2015": "GP01 Outdoor Retreat",
    "07/14/2015": "GP02 Spa Day",
    "06/06/2016": "GP03 Dine Out",
    "01/24/2017": "GP04 Vampires",
    "05/30/2017": "GP05 Parenthood",
    "02/27/2018": "GP06 Jungle Adventure",
    "05/19/2015": "SP01 Luxury Party Stuff",
    "06/16/2015": "SP02 Perfect Patio Stuff",
    "08/11/2015": "SP03 Cool Kitchen Stuff",
    "09/29/2015": "SP04 Spooky Stuff",
    "01/12/2016": "SP05 Movie Hangout Stuff",
    "02/09/2016": "SP06 Romantic Garden Stuff",
    "06/28/2016": "SP07 Kids Room Stuff",
    "07/19/2016": "SP08 Backyard Stuff",
    "12/06/2016": "SP09 Vintage Glamour Stuff",
    "03/29/2017": "SP10 Bowling Night Stuff",
    "06/20/2017": "SP11 Fitness Stuff",
    "08/24/2017": "SP12 Toddler Stuff",
    "01/16/2018": "SP13 Laundry Day Stuff",
    "03/13/2018": "SP14 My First Pet Stuff",
    "09/02/2014": "Rewards for Sims 3 Players(NA); Digital Deluxe Upgrade (NA)",
    "09/04/2014": "Rewards for Sims 3 Players(EU); Digital Deluxe Upgrade (EU)",
    "12/16/2014": "FP01 Holiday Celebration Pack",
    "08/17/2016": "Grim’s Ghoulish Guitar"};

// pack release info, mapped to month
const labelFormatMonth =  {
    "Mar 2015": "EP01 Get to work (NA)",
    "Apr 2015": "EP01 Get to work (EU)",
    "Dec 2015": "EP02 Get together (NA); EP02 Get together (EU)",
    "Nov 2016": "EP03 City Living (NA); EP03 City Living (EU)",
    "Nov 2017": "EP04 Cats & Dogs",
    "Jan 2015": "GP01 Outdoor Retreat",
    "Jul 2015": "GP02 Spa Day",
    "Jun 2016": "GP03 Dine Out",
    "Jan 2017": "GP04 Vampires",
    "May 2017": "GP05 Parenthood",
    "Feb 2018": "GP06 Jungle Adventure",
    "May 2015": "SP01 Luxury Party Stuff",
    "Jun 2015": "SP02 Perfect Patio Stuff",
    "Aug 2015": "SP03 Cool Kitchen Stuff",
    "Sep 2015": "SP04 Spooky Stuff",
    "Jan 2016": "SP05 Movie Hangout Stuff",
    "Feb 2016": "SP06 Romantic Garden Stuff",
    "Jun 2016": "SP07 Kids Room Stuff",
    "Jul 2016": "SP08 Backyard Stuff",
    "Dec 2016": "SP09 Vintage Glamour Stuff",
    "Mar 2017": "SP10 Bowling Night Stuff",
    "Jun 2017": "SP11 Fitness Stuff",
    "Aug 2017": "SP12 Toddler Stuff",
    "Jan 2018": "SP13 Laundry Day Stuff",
    "Mar 2018": "SP14 My First Pet Stuff",
    "Sep 2014": "Rewards for Sims 3 Players(NA, EU); Digital Deluxe Upgrade (NA, EU)",
    "Dec 2014": "FP01 Holiday Celebration Pack",
    "Aug 2016": "Grim’s Ghoulish Guitar"
};


export default class LineChartWithTimeRange extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsWithRange:[],
            totalNum : 0,
            startTime : null,
            endTime : null,
            dateFormatForTimeRange : "month",
        }

        this.mergePackReleaseWithItems = this.mergePackReleaseWithItems.bind(this);
        this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
    }

    mergePackReleaseWithItems() {
        const itemsWithinRange = this.state.itemsWithRange;
        const format = this.state.dateFormatForTimeRange;

        itemsWithinRange.forEach((entry, index) => {
            if (format === "month") {

                if (labelFormatMonth.hasOwnProperty(entry['time'])) {
                    // console.log(entry.time);
                    if (entry['pack release'] === undefined) {
                        entry['pack release'] = labelFormatMonth[entry['time']] + "; ";
                    } else {
                        entry['pack release'] = entry['pack release'] + labelFormatMonth[entry['time']] + "; ";
                    }
                }
            } else if (format === "day") {
                if (labelInfoDay.hasOwnProperty(entry['time'])) {
                    if (entry['pack release'] === undefined) {
                        entry['pack release'] = labelInfoDay[entry['time']] + "; ";
                    } else {
                        entry['pack release'] = entry['pack release'] + labelInfoDay[entry['time']] + "; ";
                    }                
                }
            }
        });


        this.setState({"dateFormatForTimeRange": itemsWithinRange});
    }

    componentDidMount() {
        this.queryTotalModsWithinTimeRange(this.props.startTime, this.props.endTime)
        this.setState({"startTime" : this.props.startTime, "endTime" : this.props.endTime})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startTime === this.state.startTime && nextProps.endTime === this.state.endTime) return;
        this.setState({"startTime" : nextProps.startTime, "endTime" : nextProps.endTime});
        this.queryTotalModsWithinTimeRange(nextProps.startTime, nextProps.endTime);
    }

    queryTotalModsWithinTimeRange(startTime , endTime) {
        axios.post('http://localhost:3000/numberOfRecordsByMonthWithTimeRange', {
            startTime :startTime === null ? "Mar 1994" :startTime,
            endTime : endTime === null ? "Dec 2020" : endTime,
        })
            .then(res => {
                this.setState({ 'itemsWithRange' : res.data.items.reverse(),
                    'totalNum' : res.data.totalNum, 'startTime' : startTime, 'endTime' : endTime,
                    "dateFormatForTimeRange" : res.data.dateFormatForTimeRange });
                this.mergePackReleaseWithItems();
                eventProxy.trigger("totalModsNum", res.data.totalNum);
            });
    }

    renderCustomizedLabel(props) {
      const { x, y, width, height, value } = props;
      const radius = 5;

      console.log(value);
      if (value !== undefined && value.length > 0) {
        return (
            <g>
              <circle cx={x + width / 2} cy={y - 2*radius} r={radius} fill="#82ca9d" />
            </g>
        );
      } else {
        return null;
      }
    };

    renderLineChartView() {
        if(this.state.itemsWithRange.length === 0 || this.state.itemsWithRange === null) {
            return <div>  No Data Available! :(</div>
        } else {
           return <div>
                <ResponsiveContainer width='100%' height={180}>
                    <ComposedChart data={this.state.itemsWithRange}
                              margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="time"/>
                        <Tooltip wrapperStyle={{width: 200, whiteSpace: 'pre-wrap'}} cursor={false}/>
                        <ReferenceLine y={0} stroke='#000'/>
                        <Bar dataKey= "number of mods" fill="#676979" maxBarSize={40}>
                            <LabelList dataKey="pack release" content={this.renderCustomizedLabel}/>                            
                        </Bar>
                        <Line type="monotone" dataKey="pack release" stroke="#82ca9d" />

                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        }

    }



    render () {
        return (
            this.renderLineChartView()
        );

    }
}
