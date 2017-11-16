import React, { Component } from 'react'
import { makeAPIRequest } from '../Common/getAWSSettings';
import Page from '../Page/PageComponent';
import { Grid, Cell, Card, CardText, CardActions, CardTitle, Button, Spinner } from 'react-mdl';
import Constants from '../Constants';
import Loader from '../Common/Loader';
import './BooksContainer.css';
import toastr from 'toastr';
var that;
class BooksContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            isLoad: false
        }
        that = this;
        // this.downloadBook = this.downloadBook.bind(this)
    }
    componentDidMount() {
        that.setState({ isLoad: true });
        makeAPIRequest(Constants.allBooks, (result) => {
            that.state.books = result.books;
            that.setState({ books: this.state.books, isLoad: false });
        })
    }
    downloadBook(event) {
        toastr.info('Work in Progress !!!');
       // that.setState({ isLoad: true });
    }

    render() {
        return (
            <div className="loading">
                {this.state.isLoad ? <Loader /> : null}
                <Page heading='All Books' isLogout="true">
                    <Grid>

                        {
                            this.state.books.map(function (item) {
                                const imageUrl = require(`../../assets/${item.id}.png`);
                                return (
                                    <Cell col={4} key={item.id}>
                                        <Card shadow={0} style={{ width: '320px', height: '320px', margin: 'auto' }}>
                                            <CardTitle expand style={{ color: '#fff', background: 'bottom right 15% no-repeat #46B6AC' }} >{item.name}</CardTitle>
                                            <CardText>
                                                {item.name}
                                            </CardText>
                                            <CardActions border>
                                                <Button colored onClick={that.downloadBook} id={item.id}>Download Book</Button>
                                            </CardActions>
                                        </Card>
                                    </Cell>
                                )
                            })
                        }

                    </Grid>
                </Page>
            </div>
        )
    }
}

export default BooksContainer