import React, { Component } from 'react';
import MetaData from './Data';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import { Tex } from 'react-tex';
import './DynamicHtmlTag.css';
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
            this.props.data.content.sort(function (a, b) {
                return parseFloat(a.sequance) - parseFloat(b.sequance);
            })
            booksData = Object.keys(this.props.data.content);

        }

        return (
            <Cell col={12}>
                <Cell col={12} style={{ "max-height": "500px", "overflow": "auto" }}>
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

            </Cell >
        );
    }
}

export default DynamicHtmlTag;