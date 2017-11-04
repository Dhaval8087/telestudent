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
        return (
            <Cell col={12}>
                {this.props.data.map(item => {
                    var Tag
                    Tag = this.findTagName(item.metadataId);
                    if (parseInt(item.metadataId) === 3) {
                        return <Cell col={12} key={item.id}><Tex texContent={item.value} /> <br /></Cell>
                    } else {
                        return <Cell col={12} key={item.id}><Tag>{item.value}</Tag><br /></Cell>
                    }

                })
                }
            </Cell>
        );
    }
}

export default DynamicHtmlTag;