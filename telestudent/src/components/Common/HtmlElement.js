import React, { Component } from 'react'
import { Cell } from 'react-mdl';
class HtmlElement extends Component {
    render() {
        let item = this.props.item;
        let Tag = this.props.tag;
        return (
            <Cell col={12} key={item.id}>
                <Tag key={item.id}>{item.blocks}</Tag><br />
            </Cell>
        )
    }
}

export default HtmlElement