import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datastore from 'nedb';
import MetaData from '../Data';
import { Tex } from 'react-tex';
import './Home.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.findTagName = this
            .findTagName
            .bind(this);
        this.insertData = this
            .insertData
            .bind(this);
    }
    componentDidMount() {
        this.loadData();

    }
    loadData() {
        var blocks = new Datastore({ filename: 'Blocks.db', autoload: true });

        blocks.find({}).exec(function (err, block) {
            block.forEach(function (d) {
                this.state.data.push(d);
            }.bind(this));
            this.setState({});
        }.bind(this));
    }
    insertData() {
        var blocks = new Datastore({ filename: 'Blocks.db', autoload: true });
        blocks.remove({}, {
            multi: true
        }, function (err, num) {
            this.state.data = [];
        }.bind(this));
        var blocksData = [];
        var block;
        block = {
            metadataId: 1,
            value: 'https://www.npmjs.com/package/sequential-guid'
        };
        blocksData.push(block);

        block = {
            metadataId: 2,
            value: 'The <P> element is used to define a paragraph. The exact rendering (indentation,' +
            ' leading etc.) is not defined and may be a function of other tags, style sheets,' +
            ' etc. The ALIGN attribute can be used to explicitly specify the horizontal align' +
            'ment. Paragraph elements have the same content model as headers, that is text an' +
            'd character level markup, such as character emphasis, inline images, form fields' +
            ' and math. '
        };
        blocksData.push(block);

        block = {
            metadataId: 3,
            value: "\int_{a}^{b} f(x)dx = F(b) - F(a)"
        };
        blocksData.push(block);
        blocks.insert(blocksData, function (err, docs) {
            this.loadData();
        }.bind(this));

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
            <div className="container">
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-default" onClick={this.insertData}>Add DefautlData</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        {this.state.data.map(item => {
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
                </div>
                <div className="row">
                <FlipPage>
  <article>
    <h1>My awesome first article</h1>
    <p>My awesome first content</p>
  </article>
  <article>
    <h1>My wonderful second article</h1>
    <p>My wonderful second content</p>
  </article>
  <article>
    <h1>My excellent third article</h1>
    <p>My excellent third content</p>
  </article>
</FlipPage>
                    </div>
            </div>
        );
    }
}
Home.contextTypes = {
    router: PropTypes.object.isRequired
};
export default Home;