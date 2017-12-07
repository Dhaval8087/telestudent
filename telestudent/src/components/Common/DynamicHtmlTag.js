/* eslint-disable */
import React, { Component } from 'react';
import MetaData from './Data';
import { Cell } from 'react-mdl';
import Math from './Math';
import HtmlElement from './HtmlElement';
import IndexPage from './IndexPage';
import LoadJSFile from './LoadJSFile';
import './DynamicHtmlTag.css';
class DynamicHtmlTag extends Component {

    findTagName(tagId) {
        let htmlTag = '';
        MetaData.metaData.map(item => {
            if (item.id == tagId) {
                htmlTag = item.htmlTag;
            }
        }
        )
        return htmlTag;
    }
    render() {
        let booksData = [];
        if (typeof this.props.data !== "undefined" && typeof this.props.data.content !== "undefined") {
            this.props.data.content.sort(function (a, b) {
                return parseFloat(a.sequance) - parseFloat(b.sequance);
            })
            booksData = Object.keys(this.props.data.content);
        }
        return (
            <Cell col={12}>
                {typeof this.props.data !== "undefined" && typeof this.props.data.cheapter !== "undefined" ? <span className="indextext">{this.props.data.cheapter}</span> : null}
                {typeof this.props.data !== "undefined" ? booksData.map((it,index) => {
                    let item = this.props.data.content[it];
                    if (parseInt(item.metadataId) === 0) {
                        return <IndexPage item={item} handleIndex={this.props.handleIndex} key={index}/>
                    }
                    else if (parseInt(item.metadataId) === 3) {
                        return <Math item={item} key={index}/>
                    }
                    else if (parseInt(item.metadataId) === 5) {
                        return <LoadJSFile item={item} key={index} />
                    }
                    else {
                        let Tag = this.findTagName(item.metadataId);
                        return <HtmlElement tag={Tag} item={item} key={index} />
                    }

                }) : null
                }
            </Cell >
        );
    }
}

export default DynamicHtmlTag;