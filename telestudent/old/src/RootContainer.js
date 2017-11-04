import React, { Component } from 'react';
export default class RootContainer extends Component {
    render() {
        return (
            <div>
                <div>
                    <div class="row">
                        <div class="col-lg-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}