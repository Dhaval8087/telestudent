import React, { Component } from 'react'
import { getBook, getAllbookInfo, getbookTotalPages } from '../Home/LocalDb';
import { downloadBookJson } from './DownloadBook';
import Page from '../Page/PageComponent';
import DynamicHtmlTag from '../Common/DynamicHtmlTag';
import MenuDrawer from '../Views/MenuDrawer';
import PropTypes from 'prop-types';
import Loader from '../Common/Loader';
import Constants from '../Constants';
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
            pageNo: undefined,
            totalPages: 0,
            isLoad: false
        }
        this.handlePageNavigation = this.handlePageNavigation.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.handleIndex = this.handleIndex.bind(this);
        this.handleIndexMUI = this.handleIndexMUI.bind(this);
    }
    componentDidMount() {
        this.state.pageNo = 0;
        getbookTotalPages(this.state.book, (result) => {
            this.state.totalPages = result;
            this.handlePageNavigation(0);
        });

    }
    handlePageNavigation(pageNo) {
        getBook(this.state.book, pageNo, (result) => {

            if (typeof result == "undefined") {
                this.setState({ isLoad: true });
                downloadBookJson(Constants.parentUrl + this.state.book + ".json", (result) => {
                    this.setState({ isLoad: false });
                    this.context.router.push("/books");
                })
            }
            else {
                if (pageNo === 0) {
                    this.state.index = result.content;
                }
                if (pageNo === (this.state.totalPages - 1)) {
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

                this.setState({ index: this.state.index, data: result.content, isNext: this.state.isNext, isPrev: this.state.isPrev });
            }


        });



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
                {this.state.isLoad ? <Loader /> : null}
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
ViewBook.contextTypes = {
    router: PropTypes.object.isRequired
};
export default ViewBook