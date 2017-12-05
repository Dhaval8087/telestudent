import React, { Component } from 'react'
import { makeAPIRequest } from '../Common/getAWSSettings';
import Page from '../Page/PageComponent';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardText, CardActions, CardTitle, Button, Spinner } from 'react-mdl';
import Constants from '../Constants';
import Loader from '../Common/Loader';
import './BooksContainer.css';
import toastr from 'toastr';
import { downloadBookJson, downloadAllBooksInformation } from './DownloadBook';
import { getBook, getAllbookInfo, removeBook } from '../Home/LocalDb';
var localFiles = []
class BooksContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            isLoad: false,
            isDisabled: false,
        }
        this.checkLocalBook = this.checkLocalBook.bind(this);
        this.downloadBook = this.downloadBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.downloadBookFromAWS = this.downloadBookFromAWS.bind(this);
    }
    componentDidMount() {
        this.setState({ isLoad: true });
        getAllbookInfo((local) => {
            localFiles = local;
            console.log(localFiles);
            downloadAllBooksInformation((result) => {
                this.state.books = result;
                this.checkLocalBook();
                this.setState({ books: this.state.books, isLoad: false });
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
        this.state.books.map((item) => {
            if (this.checkIfDownloaded(item.id)) {
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
            this.downloadBookFromAWS(bookname);
        }
        else {
            this.context.router.push({    // use push
                pathname: `/view/${bookname}`,
            });

        }

    }
    updateBook(event) {
        var bookname = event.target.id;
        this.downloadBookFromAWS(bookname);

    }
    downloadBookFromAWS(bookname) {
        this.setState({ isLoad: true, isDisabled: true });
        downloadBookJson(Constants.parentUrl + bookname + ".json", (result) => {
            if (result != null) {
                this.state.books.forEach((element, index) => {
                    if (element.id === bookname) {
                        element.isDownloaded = true;
                        return;
                    }
                });
                this.setState({ isLoad: false, isDisabled: false, books: this.state.books });
                toastr.success('Book Downloaded successfully');
            }
            else {
                this.setState({ isLoad: false, isDisabled: false });
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
                            this.state.books.map((item) => {
                                //const imageUrl = require(`../../assets/${item.id}.png`);
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
                                                        <Button colored disabled onClick={this.downloadBook} id={item.id} name={buttonText}>{buttonText}</Button>

                                                        :
                                                        <Button colored onClick={this.downloadBook} id={item.id} name={buttonText}>{buttonText}</Button>
                                                }
                                                {
                                                    this.state.isDisabled ?
                                                        <Button colored disabled onClick={this.updateBook} id={item.id} name={buttonText}>Update Book</Button>

                                                        :
                                                        <Button colored onClick={this.updateBook} id={item.id} name={buttonText}>Update Book</Button>
                                                }
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
BooksContainer.contextTypes = {
    router: PropTypes.object.isRequired
};
export default BooksContainer