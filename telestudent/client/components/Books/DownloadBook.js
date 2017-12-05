
import { makeAPIRequest } from '../Common/getAWSSettings';
import Constants from '../Constants';
import { storeBook, storeAllbooksInfo, removeBook } from '../Home/LocalDb';

function downloadAllBooksInformation(callback) {
    // make API call for download all books information from the aws.
    makeAPIRequest(Constants.allBooks, (result) => {
        callback(result.books);
        //store all books information in local db

    })
}
function downloadBookJson(pathTemplate, callback) {
    var pages = [];
    // make the API request for download the specific book inforation 
    makeAPIRequest(pathTemplate, (result) => {
        if (result != null) {
            var totalPages = result.pages.length - 1;
            removeBook(result.bookname, () => {
                storeAllbooksInfo(result.bookname, () => {
                    result.pages.map(function (item) {
                        //make the API request to download the specific pages.
                        downloadPages(result.bookname, item.fileName, item.page, () => {
                            if (item.page == totalPages) {
                                //sometimes if last page take more time so will hold 3 sec  so process will complete it.
                                setTimeout(function () {
                                    callback(true);
                                }, 3000)
                            }
                        });

                    });
                })
            });
        }
        else {
            callback(null);
        }
    })
}
//this function will download the pages from aws based on book name.
function downloadPages(bookName, page, pageNo, callback) {
    var url = encodeURIComponent(bookName + "/" + page);
    makeAPIRequest(Constants.parentUrl + url, (result) => {
        if (result != null) {
            storeBook(bookName, result, pageNo);
        }
        callback();
    });
}
export {
    downloadBookJson,
    downloadAllBooksInformation
}