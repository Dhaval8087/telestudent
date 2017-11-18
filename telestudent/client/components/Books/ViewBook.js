import React, { Component } from 'react'
import { getBook, getAllbookInfo } from '../Home/LocalDb';
import Page from '../Page/PageComponent';
import DynamicHtmlTag from '../Common/DynamicHtmlTag';
import { Grid, Cell, Card, CardText, CardActions, CardTitle, Button, Spinner } from 'react-mdl';
var that;
class ViewBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.params.book,
            data: []
        }
        that = this;
    }
    componentDidMount() {
        getBook(this.state.book, (result) => {
            
            that.setState({ data: result[0].content });
        });
    }

    render() {

        return (
            <Page heading='Book Content' isLogout="true">
                <Grid>
                    <Cell col={12}>
                        <DynamicHtmlTag data={this.state.data} />
                    </Cell>
                </Grid>
            </Page>
        )
    }
}

export default ViewBook