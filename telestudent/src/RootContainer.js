import React from "react";
import {Link} from "react-router";
export default class RootContainer extends React.Component {
    render() {
        const {location} = this.props;
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