import React, { Component } from 'react'
import { Cell } from 'react-mdl';
import { Tex } from 'react-tex';
class Math extends Component {
    render() {
        let item=this.props.item;
        return (
            <Cell col={12} key={item.id}>
                <Tex texContent={item.blocks} /> <br />
            </Cell>
        )
    }
}

export default Math