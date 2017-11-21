import React, { Component } from 'react'
import { getBook, getAllbookInfo } from '../Home/LocalDb';
import Page from '../Page/PageComponent';
import DynamicHtmlTag from '../Common/DynamicHtmlTag';
import { Grid, Cell, Card, CardText, CardActions, CardTitle, Button, Spinner, FABButton, Icon } from 'react-mdl';
import './ViewBook.css';
var that;
var pageNo = 1;
class ViewBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.params.book,
            data: [],
            books: [],
            isNext: true,
            isPrev: false
        }
        that = this;
        this.handlePageNavigation = this.handlePageNavigation.bind(this);
    }
    componentDidMount() {
        pageNo = 1;
        getBook(this.state.book, (result) => {
            this.state.books = result;
            that.handlePageNavigation();
        });

    }
    handlePageNavigation() {
        var books = this.state.books;
        books.sort(function (a, b) {
            return parseFloat(a.pageNo) - parseFloat(b.pageNo);
        });
        var dd = books.find(p => p.pageNo == pageNo);
        if (pageNo === books.length) {
            this.state.isNext = false;
        }
        else {
            this.state.isNext = true;
        }
        if (pageNo > 1) {
            this.state.isPrev = true;
        }
        else {
            this.state.isPrev = false;
        }
        this.setState({ data: dd.content, isNext: this.state.isNext, isPrev: this.state.isPrev });
    }
    nextPage() {
        pageNo = pageNo + 1;
        that.handlePageNavigation();
    }
    prevPage() {
        pageNo = pageNo - 1;
        that.handlePageNavigation();
    }

    render() {
        var nextIcon = require('../../assets/next.png');
        var previosuIcon = require('../../assets/previous.png');
        return (
            <Page heading='Book Content' isLogout="true">
                <Grid>
                    <Cell col={12}>
                        <DynamicHtmlTag data={this.state.data} />
                    </Cell>
                    <Cell col={4}>
                        {
                            this.state.isPrev ?
                                <img src={previosuIcon} className="img" onClick={this.prevPage} />
                                :
                                <img src={previosuIcon} className="img img-opacity" />
                        }

                    </Cell>
                    <Cell col={4}>
                        {
                            this.state.isNext ?
                                <img src={nextIcon} className="img" onClick={this.nextPage} />
                                :
                                <img src={nextIcon} className="img img-opacity" />
                        }


                    </Cell>
                </Grid>
            </Page>
        )
    }
}

export default ViewBook