import React, { Component } from 'react'
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import './DynamicHtmlTag.css';
class IndexPage extends Component {
    render() {
        let item = this.props.item;
        return (
            <Cell col={12}>
                <Cell col={12} key={item.id}>
                    <Cell col={6}>
                        <span>{item.sequance}.</span>
                        <a key={item.id} className="pointer" id={item.page} onClick={this.props.handleIndex}>
                            {item.blocks}
                        </a>
                    </Cell>
                    <br />
                </Cell>
            </Cell>
        )
    }
}

export default IndexPage