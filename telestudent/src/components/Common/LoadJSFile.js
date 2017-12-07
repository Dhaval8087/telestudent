/* eslint-disable */
import React, { Component } from 'react'
import { makeAPIRequest } from './getAWSSettings'
import Constants from '../Constants';
class LoadJsFile extends Component {
    constructor() {
        super();
        this.state = {
            isload: false
        }
    }
    componentDidMount() {
        let item = this.props.item;
        var url = encodeURIComponent("Capital_in_Twenty_First/" + item.blocks);
        this.setState({ isload: true });
        makeAPIRequest(Constants.parentUrl + url, (result) => {
            if (result != null) {
                this.setState({ isload: false });
                eval(result);

            }

        });
    }
    render() {
        return (
            <div id="put_script_here">
                {this.state.isload ? <h1> Loading JS ....</h1> : <h1>Loaded</h1>}
            </div>
        )
    }
}

export default LoadJsFile