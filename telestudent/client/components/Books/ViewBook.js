import React, { Component } from 'react'
import { getBook, getAllbookInfo } from '../Home/LocalDb';
import Page from '../Page/PageComponent';
import DynamicHtmlTag from '../Common/DynamicHtmlTag';
import MenuDrawer from '../Views/MenuDrawer';
import { Grid, Cell, Card, CardText, CardActions, CardTitle, Button, Spinner, FABButton, Icon } from 'react-mdl';
import './ViewBook.css';
//var pageNo = 0;
class ViewBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.params.book,
            data: [],
            bookPages: [],
            index: undefined,
            isNext: true,
            isPrev: false,
            pageNo: undefined
        }
        this.handlePageNavigation = this.handlePageNavigation.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.handleIndex = this.handleIndex.bind(this);
        this.handleIndexMUI = this.handleIndexMUI.bind(this);
    }
    componentDidMount() {
        getBook(this.state.book, (result) => {
            this.state.bookPages = result;
            this.state.pageNo = 0;
            this.handlePageNavigation(0);
        });
    }
    handlePageNavigation(pageNo) {
        let pages = this.state.bookPages;
        pages.sort(function (a, b) {
            return parseFloat(a.pageNo) - parseFloat(b.pageNo);
        });
        let dd = pages.find(p => p.pageNo === pageNo.toString());
        let index = pages.find(p => p.pageNo === "0");

        if (pageNo === (pages.length - 1)) {
            this.state.isNext = false;
        }
        else {
            this.state.isNext = true;
        }
        if (pageNo > 0) {
            this.state.isPrev = true;
        }
        else {
            this.state.isPrev = false;
        }
        this.setState({ index: index.content, data: dd.content, isNext: this.state.isNext, isPrev: this.state.isPrev });
    }
    nextPage() {
        let pageNo = this.state.pageNo;
        pageNo = pageNo + 1;
        this.setState({ pageNo: pageNo });
        this.handlePageNavigation(pageNo);
    }
    prevPage() {
        let pageNo = this.state.pageNo;
        pageNo = pageNo - 1;
        this.setState({ pageNo: pageNo });
        this.handlePageNavigation(pageNo);
    }
    handleIndex(event) {
        let pageNo = parseInt(event.target.id);
        this.setState({ pageNo: pageNo });
        this.handlePageNavigation(pageNo);
    }
    handleIndexMUI(event) {
        let context = this;
        let pageNo = parseInt(event.target.id);
        this.setState({ pageNo: pageNo });
        this.handlePageNavigation(pageNo);
    }

    render() {
        var nextIcon = require('../../assets/next.png');
        var previosuIcon = require('../../assets/previous.png');
        return (
            <div>
                <MenuDrawer
                    index={this.state.index}
                    handleIndex={this.handleIndexMUI}
                />
                <Page heading='Book Content' isLogout="true">
                    <Grid>
                        <Cell col={12}>
                            <DynamicHtmlTag data={this.state.data} handleIndex={this.handleIndex} />
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
            </div>
        )
    }
}

export default ViewBook