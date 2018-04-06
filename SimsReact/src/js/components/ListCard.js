/**
 * Created by lema on 2018/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { List, Card } from 'antd';

class ListCard extends React.Component{
    constructor(props) {
        super(props)
    }


    render () {
        return (
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={this.props.topItems}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title}>Card content</Card>
                    </List.Item>
                )}
                />

        );
    }
};

export default ListCard;

