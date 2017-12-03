import React, { Component } from 'react';
import MetaData from './Data';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import Math from './Math';
import HtmlElement from './HtmlElement';
import IndexPage from './IndexPage';
import LoadJSFile from './LoadJSFile';
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
        let booksData = [];
        if (typeof this.props.data != "undefined" && typeof this.props.data.content != "undefined") {
            this.props.data.content.sort(function (a, b) {
                return parseFloat(a.sequance) - parseFloat(b.sequance);
            })
            booksData = Object.keys(this.props.data.content);
        }
        return (
            <Cell col={12}>
                <Cell col={12} style={{ "height": "auto", "max-height": "50%", "overflow": "auto" }}>
                    {typeof this.props.data != "undefined" && typeof this.props.data.cheapter != "undefined" ? <span className="indextext">{this.props.data.cheapter}</span> : null}
                    {typeof this.props.data != "undefined" ? booksData.map(it => {
                        let item = this.props.data.content[it];
                        if (parseInt(item.metadataId) === 0) {
                            return <IndexPage item={item} handleIndex={this.props.handleIndex} />
                        }
                        else if (parseInt(item.metadataId) === 3) {
                            return <Math item={item} />
                        }
                        else if (parseInt(item.metadataId) === 5) {
                            return <LoadJSFile item={item} />
                        }
                        else {
                            let Tag = this.findTagName(item.metadataId);
                            return <HtmlElement tag={Tag} item={item} />
                        }

                    }) : null
                    }
                </Cell>

            </Cell >
        );
    }
}

export default DynamicHtmlTag;