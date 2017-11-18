import React, { Component } from 'react';
import MetaData from './Data';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import { Tex } from 'react-tex';
class DynamicHtmlTag extends Component {


    findTagName(tagId) {
        let htmlTag = '';
        MetaData.metaData.map(item => {
            if (item.id == tagId)
                htmlTag = item.htmlTag;
        }
        )
        return htmlTag;
    }
    render() {
        var booksData = [];
        if (typeof this.props.data != "undefined" && typeof this.props.data.content != "undefined") {
            booksData = Object.keys(this.props.data.content);
        }

        return (
            <Cell col={12}>
                {typeof this.props.data != "undefined" ? booksData.map(it => {
                    var item = this.props.data.content[it];
                    var Tag
                    Tag = this.findTagName(item.metadataId);
                    if (parseInt(item.metadataId) === 3) {
                        return <Cell col={12} key={item.id}><Tex texContent={item.blocks} /> <br /></Cell>
                    } else {
                        return <Cell col={12} key={item.id}><Tag key={item.id}>{item.blocks}</Tag><br /></Cell>
                    }

                }) : null
                }
            </Cell>
        );
    }
}

export default DynamicHtmlTag;