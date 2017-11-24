import React, { Component } from 'react'
import { makeAPIRequest } from '../Common/getAWSSettings';
import Page from '../Page/PageComponent';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardText, CardActions, CardTitle, Button, Spinner } from 'react-mdl';
import Constants from '../Constants';
import Loader from '../Common/Loader';
import './BooksContainer.css';
import toastr from 'toastr';
import { downloadBookJson, downloadAllBooksInformatino } from './DownloadBook';
import { getBook, getAllbookInfo, removeBook } from '../Home/LocalDb';
var that;
var localFiles = []
class BooksContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            isLoad: false,
            isDisabled: false,
        }
        that = this;
        // this.downloadBook = this.downloadBook.bind(this)
    }
    componentDidMount() {
        that.setState({ isLoad: true });
        getAllbookInfo((local) => {
            localFiles = local;
            console.log(localFiles);
            downloadAllBooksInformatino((result) => {
                that.state.books = result;
                that.checkLocalBook();
                that.setState({ books: that.state.books, isLoad: false });
            })
        })


    }

    checkIfDownloaded(bookname) {
        var isdownloaded = false;
        localFiles.map((item) => {
            if (item.id == bookname) {
                isdownloaded = true;
            }
        })

        return isdownloaded;
    }
    checkLocalBook() {
        that.state.books.map((item) => {
            if (that.checkIfDownloaded(item.id)) {
                item.isLocal = true;
            }
            else {
                item.isLocal = false;
            }
        });
    }
    downloadBook(event) {
        //toastr.info('Work in Progress !!!');
        var bookname = event.target.id;
        if (event.target.name == "Download Book") {
            that.downloadBookFromAWS(bookname);
        }
        else {
            that.context.router.push({    // use push
                pathname: `/view/${bookname}`,
            });

        }

    }
    updateBook(event) {
        var bookname = event.target.id;
        that.downloadBookFromAWS(bookname);

    }
    downloadBookFromAWS(bookname) {
        that.setState({ isLoad: true, isDisabled: true });
        downloadBookJson(Constants.parentUrl + bookname + ".json", (result) => {
            if (result != null) {
                that.state.books.forEach((element, index) => {
                    if (element.id === bookname) {
                        element.isDownloaded = true;
                        return;
                    }
                });
                that.setState({ isLoad: false, isDisabled: false, books: that.state.books });
                toastr.success('Book Downloaded successfully');
            }
            else {
                that.setState({ isLoad: false, isDisabled: false });
            }
            
        });
    }


    render() {

        return (
            <div className="loading">
                {this.state.isLoad ? <Loader /> : null}
                <Page heading='All Books' isLogout="true" isHome="true">
                    <Grid>
                        {
                            this.state.books.map(function (item) {
                                const imageUrl = require(`../../assets/${item.id}.png`);
                                var buttonText;
                                if ((item.isLocal != undefined && item.isLocal) || item.isDownloaded) {
                                    buttonText = "View Book";
                                }
                                else {
                                    buttonText = "Download Book";
                                }
                                return (
                                    <Cell col={4} key={item.id}>
                                        <Card shadow={0} style={{ width: '320px', height: '320px', margin: 'auto' }}>
                                            <CardTitle expand style={{ color: '#fff', background: 'bottom right 15% no-repeat #46B6AC' }} >{item.name}</CardTitle>
                                            <CardText>
                                                {item.name}
                                            </CardText>
                                            <CardActions border>
                                                {
                                                    this.state.isDisabled ?
                                                        <Button colored disabled onClick={that.downloadBook} id={item.id} name={buttonText}>{buttonText}</Button>

                                                        :
                                                        <Button colored onClick={that.downloadBook} id={item.id} name={buttonText}>{buttonText}</Button>
                                                }
                                                {
                                                    this.state.isDisabled ?
                                                        <Button colored disabled onClick={that.updateBook} id={item.id} name={buttonText}>Update Book</Button>

                                                        :
                                                        <Button colored onClick={that.updateBook} id={item.id} name={buttonText}>Update Book</Button>
                                                }
                                            </CardActions>
                                        </Card>
                                    </Cell>
                                )
                            }.bind(this))
                        }

                    </Grid>
                </Page>
            </div>
        )
    }
}
BooksContainer.contextTypes = {
    router: PropTypes.object.isRequired
};
export default BooksContainer