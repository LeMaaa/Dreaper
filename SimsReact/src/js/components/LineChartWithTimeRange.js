/**
 * Created by lema on 2018/3/15.
 */


import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy'
import { ResponsiveContainer, BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList} from 'recharts';
import { Badge } from 'antd';

import TimeSeriesData from '../components/TimeSeriesData'


const labelInfoDay = [{date: "03/31/2015", name: "EP01 Get to work (NA)"},
{date: "04/02/2015", name: "EP01 Get to work (EU)"},
{date: "12/08/2015", name: "EP02 Get together (NA)"},
{date: "12/10/2015", name: "EP02 Get together (NA)"},
{date: "11/01/2016", name: "EP03 City Living (NA)"},
{date: "11/03/2016", name: "EP03 City Living (EU)"},
{date: "11/10/2017", name: "EP04 Cats & Dogs"},
{date: "01/13/2015", name: "GP01 Outdoor Retreat"},
{date: "07/14/2015", name: "GP02 Spa Day"},
{date: "06/06/2016", name: "GP03 Dine Out"},
{date: "01/24/2017", name: "GP04 Vampires"},
{date: "05/30/2017", name: "GP05 Parenthood"},
{date: "02/27/2018", name: "GP06 Jungle Adventure"},
{date: "05/19/2015", name: "SP01 Luxury Party Stuff"},
{date: "06/16/2015", name: "SP02 Perfect Patio Stuff"},
{date: "08/11/2015", name: "SP03 Cool Kitchen Stuff"},
{date: "09/29/2015", name: "SP04 Spooky Stuff"},
{date: "01/12/2016", name: "SP05 Movie Hangout Stuff"},
{date: "02/09/2016", name: "SP06 Romantic Garden Stuff"},
{date: "06/28/2016", name: "SP07 Kids Room Stuff"},
{date: "07/19/2016", name: "SP08 Backyard Stuff"},
{date: "12/06/2016", name: "SP09 Vintage Glamour Stuff"},
{date: "03/29/2017", name: "SP10 Bowling Night Stuff"},
{date: "06/20/2017", name: "SP11 Fitness Stuff"},
{date: "08/24/2017", name: "SP12 Toddler Stuff"},
{date: "01/16/2018", name: "SP13 Laundry Day Stuff"},
{date: "03/13/2018", name: "SP14 My First Pet Stuff"},
{date: "09/02/2014", name: "Rewards for Sims 3 Players(NA)"},
{date: "09/04/2014", name: "Rewards for Sims 3 Players(EU)"},
{date: "09/02/2014", name: "Digital Deluxe Upgrade (NA)"},
{date: "09/04/2014", name: "Digital Deluxe Upgrade (EU)"},
{date: "12/16/2014", name: "FP01 Holiday Celebration Pack"},
{date: "08/17/2016", name: "Grim’s Ghoulish Guitar"}]

const labelFormatMonth =  [{date: "Mar 2015", name: "EP01 Get to work (NA)"},
    {date: "Apr 2015", name: "EP01 Get to work (EU)"},
    {date: "Dec 2015", name: "EP02 Get together (NA)"},
    {date: "Dec 2015", name: "EP02 Get together (NA)"},
    {date: "Nov 2016", name: "EP03 City Living (NA)"},
    {date: "Nov 2016", name: "EP03 City Living (EU)"},
    {date: "Nov 2017", name: "EP04 Cats & Dogs"},
    {date: "Jan 2015", name: "GP01 Outdoor Retreat"},
    {date: "Jul 2015", name: "GP02 Spa Day"},
    {date: "Jun 2016", name: "GP03 Dine Out"},
    {date: "Jan 2017", name: "GP04 Vampires"},
    {date: "May 2017", name: "GP05 Parenthood"},
    {date: "Feb 2018", name: "GP06 Jungle Adventure"},
    {date: "May 2015", name: "SP01 Luxury Party Stuff"},
    {date: "Jun 2015", name: "SP02 Perfect Patio Stuff"},
    {date: "Aug 2015", name: "SP03 Cool Kitchen Stuff"},
    {date: "Sep 2015", name: "SP04 Spooky Stuff"},
    {date: "Jan 2016", name: "SP05 Movie Hangout Stuff"},
    {date: "Feb 2016", name: "SP06 Romantic Garden Stuff"},
    {date: "Jun 2016", name: "SP07 Kids Room Stuff"},
    {date: "Jul 2016", name: "SP08 Backyard Stuff"},
    {date: "Dec 2016", name: "SP09 Vintage Glamour Stuff"},
    {date: "Mar 2017", name: "SP10 Bowling Night Stuff"},
    {date: "Jun 2017", name: "SP11 Fitness Stuff"},
    {date: "Aug 2017", name: "SP12 Toddler Stuff"},
    {date: "Jan 2018", name: "SP13 Laundry Day Stuff"},
    {date: "Mar 2018", name: "SP14 My First Pet Stuff"},
    {date: "Sep 2014", name: "Rewards for Sims 3 Players(NA)"},
    {date: "Sep 2014", name: "Rewards for Sims 3 Players(EU)"},
    {date: "Sep 2014", name: "Digital Deluxe Upgrade (NA)"},
    {date: "Sep 2014", name: "Digital Deluxe Upgrade (EU)"},
    {date: "Dec 2014", name: "FP01 Holiday Celebration Pack"},
    {date: "Aug 2016", name: "Grim’s Ghoulish Guitar"}];


export default class LineChartWithTimeRange extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsWithRange:[],
            totalNum : 0,
            startTime : null,
            endTime : null,
            dateFormatForTimeRange : "MMM YYYY",
        }
    }

    componentDidMount() {
        this.queryTotalModsWithinTimeRange(this.props.startTime, this.props.endTime)
        this.setState({"startTime" : this.props.startTime, "endTime" : this.props.endTime})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startTime === this.state.startTime && nextProps.endTime === this.state.endTime) return;
        this.setState({"startTime" : nextProps.startTime, "endTime" : nextProps.endTime});
        this.queryTotalModsWithinTimeRange(nextProps.startTime, nextProps.endTime)
    }

    queryTotalModsWithinTimeRange(startTime , endTime) {
        axios.post('http://localhost:3000/numberOfRecordsByMonthWithTimeRange', {
            startTime :startTime === null ? "Mar 1994" :startTime,
            endTime : endTime === null ? "Dec 2020" : endTime,
        })
            .then(res => {
                // this.setState({items:[...this.state.items, res.data]});
                this.setState({ 'itemsWithRange' : res.data.items.reverse(),
                    'totalNum' : res.data.totalNum, 'startTime' : startTime, 'endTime' : endTime,
                    "dateFormatForTimeRange" : res.data.dateFormatForTimeRange });
                eventProxy.trigger("totalModsNum", res.data.totalNum);
            });
        console.log("dateFormatForTimeRange" , this.state.dateFormatForTimeRange);
    }

    renderLineChartView() {
        if(this.state.itemsWithRange.length === 0 || this.state.itemsWithRange === null) {
            return <div>  No Data Available! :(</div>
        } else {
           return <div>
                <ResponsiveContainer width='100%' height={150}>
                    <BarChart data={this.state.itemsWithRange}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="time"/>
                        <Tooltip cursor={false}/>
                        <LabelList data = {labelFormatMonth} dataKey = "date" position="top"/>
                        <ReferenceLine y={0} stroke='#000'/>
                        <Bar dataKey= "number of mods" fill="#676979" maxBarSize={30} />
                    </BarChart>
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
