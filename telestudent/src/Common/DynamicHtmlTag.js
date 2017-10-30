import React, { Component } from 'react';
import MetaData from '../Data';
class DynamicHtmlTag extends Component {
    constructor(props) {
        super(props);
        this.findTagName = this.findTagName.bind(this);
    }

    findTagName(tagId) {
        let htmlTag = '';
        MetaData.metaData.map(item => {
            if (item.id === tagId)
                htmlTag = item.htmlTag;
        }
        )
        return htmlTag;
    }
    render() {
        return (
            <div className="col-md-12 text-center">
                {this.props.data.map(item => {
                    var Tag
                    Tag = this.findTagName(item.metadataId);
                    if (item.metadataId === 3) {
                        return <Tex texContent={item.value} />
                    } else {
                        return <Tag>{item.value}</Tag>
                    }

                })
                }
            </div>
        );
    }
}

export default DynamicHtmlTag;