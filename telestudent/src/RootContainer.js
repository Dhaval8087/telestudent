import React from "react";
export default class RootContainer extends React.Component {
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