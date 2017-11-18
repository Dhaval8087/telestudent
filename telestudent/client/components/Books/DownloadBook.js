
import { makeAPIRequest } from '../Common/getAWSSettings';
import Constants from '../Constants';
import { storeBook, storeAllbooksInfo } from '../Home/LocalDb';

function downloadAllBooksInformatino(callback) {
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
            var totalPages = result.pages.length;
            storeAllbooksInfo(result.bookname, () => {
                result.pages.map(function (item) {
                    //make the API request to download the specific pages.
                    downloadPages(result.bookname, item.fileName, item.page, () => {
                        if (item.page == totalPages) {
                            callback(true);
                        }
                    });
    
                });
            })
           
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
    downloadAllBooksInformatino
}