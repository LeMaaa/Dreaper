/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Avatar, Card, Icon, Button, Modal, Row, Col } from 'antd';

const { Meta } = Card;

const contentListNoTitle = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    project: <p>project content</p>,
};

const tabListNoTitle = [{
    key: 'article',
    tab: 'article',
}, {
    key: 'app',
    tab: 'app',
}, {
    key: 'project',
    tab: 'project',
}];


class KeywordCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mods : [],
            startTime : null,
            endTime : null,
            keyword : null,
            index : -1,
            visible: false,
            noTitleKey: 'app',
        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
    }

    showModal(){
        this.setState({
            visible: true,
        });
    }

    handleOk(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }




    queryModsWithinTimeRange(startTime, endTime, keyword) {
        axios.post('http://localhost:3000/getModsWithKeyword', {

            startTime: startTime === null ? "Mar 1994" : startTime,
            endTime: endTime === null ? "Dec 2020" : endTime,
            keyword : keyword

        })
            .then(res => {
                console.log("received data www");
                // console.log(res.data);
                console.log(res.data)
                this.setState({ 'mods' : res.data})
            });
    }

    onTabChange(key, type) {
        console.log(key, type);
        this.setState({ [type]: key });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.startTime === this.state.startTime && nextProps.endTime === this.state.endTime
            && nextProps.keyword === this.state.keyword) return;

        axios.post('http://localhost:3000/getModByName', {
            startTime: nextProps.startTime,
            endTime:nextProps.endTime,
            keyword : nextProps.keyword
        })
            .then(res => {
                console.log("received data next props keyword");
                // console.log(res.data);
                this.setState({ 'mods' : res.data})
                this.setState({
                    'startTime': nextProps.startTime,
                    'endTime':nextProps.endTime,
                    'keyword' : nextProps.keyword
                })
            });
    }


    // componentDidMount() {
    //     this.state.keyword = this.props.keyword;
    //     this.state.startTime = this.props.startTime;
    //     this.state.endTime = this.props.endTime;
    //     this.state.index = this.props.index;
    //     this.queryModsWithinTimeRange(this.props.startTime, this.props.endTime, this.props.keyword);
    // }

    pieChartButtonClicked(event) {
        console.log("event");
        console.log(event.target.value);
    }



    render () {
        return (
            <div>
                <Card title= {"No." + this.props.index} extra={<Button icon = "pie-chart" onClick={this.showModal}/>} style={{ width: 300 }}>

                    <Meta
                        title= {this.props.keyword}
                    />
                </Card>
                <Modal
                    title={this.props.keyword}
                    visible={this.state.visible}
                    footer = {null}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {816}
                >
                    <Row>
                        <Col span={8}>
                        </Col>
                        <Col span = {16}>
                            <Card
                                style={{ width: '100%' }}
                                tabList={tabListNoTitle}
                                activeTabKey={this.state.noTitleKey}
                                onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
                            >
                                {contentListNoTitle[this.state.noTitleKey]}
                            </Card>
                        </Col>
                    </Row>

                </Modal>
            </div>




        );
    }
};

export default KeywordCard;

