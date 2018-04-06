/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { DateRangePicker } from 'element-react';

import 'element-theme-default/lib/date-picker.css';



class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value2 : null,
        }
    }


    componentDidMount() {

    }

    render() {

        return (
            <div className="container">
                <DateRangePicker
                    value={this.state.value2}
                    placeholder="Pick a range"
                    align="right"
                    ref={e=>this.daterangepicker2 = e}
                    onChange={date=>{
                        console.debug('DateRangePicker2 changed: ', date)
                        this.setState({value2: date})
                    }}
                    shortcuts={[{
                        text: 'Last week',
                        onClick: ()=> {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

                            this.setState({value2: [start, end]})
                            this.daterangepicker2.togglePickerVisible()
                        }
                    }, {
                        text: 'Last month',
                        onClick: ()=> {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

                            this.setState({value2: [start, end]})
                            this.daterangepicker2.togglePickerVisible()
                        }
                    }, {
                        text: 'Last 3 months',
                        onClick: ()=> {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            this.setState({value2: [start, end]})
                            this.daterangepicker2.togglePickerVisible()
                        }
                    }]}
                />
            </div>
        );
    }
}

export default TimeSlider;

