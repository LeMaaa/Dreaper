/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

import ListCard from '../components/ListCard'
import TimeSlider from '../components/TimeSlider'


class Dashboard extends React.Component{



    componentDidMount() {
            // axios.get('http://localhost:3000/downloadsOfKey', {
            //     params: {
            //         startTime: this.state.startTime === null ? "Mar 1994" : this.state.startTime,
            //         endTime: this.state.endTime === null ? "Dec 2020" : this.state.endTime,
            //     }
            // })
            //     .then(res => {
            //         console.log("received data");
            //         // console.log(res.data);
            //         this.setState({ 'itemsByKey' : this.state.itemsByKey.concat(res.data)})
            //     });
            //
            //
            //     // 监听事件
            //     eventProxy.on('changeKeyWordMod', (entry) => {
            //         this.setState({
            //             'itemsByKey' : entry
            //         });
            //     });
        }


    render () {
        return (
            <div className="container">

                    <Row>

                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6}>
                            <TimeSlider/>
                        </Col>

                    </Row>
                    <Row>


                    </Row>
                </div>

        );
    }
};

export default Dashboard;
