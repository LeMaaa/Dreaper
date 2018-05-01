/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { DatePicker } from 'antd';
import eventProxy from 'react-eventproxy'
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange(date, dateString){
        eventProxy.trigger("ChangeTimeRange", dateString);
    }


    render() {

        return (
            <div className="container">
                <RangePicker
                    size = "large"
                    onChange = {this.onChange}
                    format={dateFormat}
                />
            </div>
        );
    }
}

export default TimeSlider;

