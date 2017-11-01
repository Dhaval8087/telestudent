import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datastore from 'nedb';
import DynamicHtmlTag from "../Common/DynamicHtmlTag";
import { getBlcoks } from '../services/blockService';
import Switch from 'react-toggle-switch'
import "react-toggle-switch/dist/css/switch.min.css"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            switchOn: false
        }

        this.insertData = this.insertData.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        this.loadData();

    }
    loadData() {
        this.state.data = [];
        if (this.state.switchOn === false) {
            var blocks = new Datastore({ filename: 'Blocks.db', autoload: true });

            blocks.find({}).exec(function (err, block) {
                block.forEach(function (d) {
                    this.state.data.push(d);
                }.bind(this));
                this.setState({});
            }.bind(this));
        }
        else {
            getBlcoks((data) => {

                data.forEach(function (d) {
                    this.state.data.push(d);
                }.bind(this));
                this.setState({});
            });
        }

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
            value:"\int_0^\infty x^2 dx"
           // value: "\int_{a}^{b} f(x)dx = F(b) - F(a)"
        };
        blocksData.push(block);
        blocks.insert(blocksData, function (err, docs) {
            this.loadData();
        }.bind(this));

    }
    toggle() {
        if (this.state.switchOn) {
            this.state.switchOn=false;
            this.setState({ switchOn: this.state.switchOn });
        } else {
            this.state.switchOn=true;
            this.setState({ switchOn: this.state.switchOn });
        }
        this.loadData();
    }
    render() {
        let switchtext;
        if (this.state.switchOn) {
            switchtext = 'Online';
        }
        else {
            switchtext = 'Offline';
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-default" onClick={this.insertData}>Add DefautlData</button>
                    </div>

                </div>
                <br />
                <div className="row">
                    <div className="col-md-4">
                        <Switch onClick={this.toggle}
                            on={this.state.switchOn}
                        /><span>{switchtext}</span>
                    </div>
                </div>
                <br />
                <div className="row">
                    <DynamicHtmlTag data={this.state.data} />
                </div>
            </div>
        );
    }
}
Home.contextTypes = {
    router: PropTypes.object.isRequired
};
export default Home;