import React, { Component } from 'react';
import MetaData from '../Data';
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
            <div className="col-md-12 text-center">
                {this.props.data.map(item => {
                    var Tag
                    Tag = this.findTagName(item.metadataId);
                    if (item.metadataId === 3) {
                        debugger;
                        item.value=item.value.replace('\b',"'\'");
                        return <div><Tex texContent={item.value} /> <br/></div>
                    } else {
                        return <div><Tag>{item.value}</Tag><br/></div>
                    }

                })
                }
            </div>
        );
    }
}

export default DynamicHtmlTag;