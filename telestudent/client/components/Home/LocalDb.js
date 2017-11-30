
import Datastore from 'nedb';
import { debug } from 'util';

function getbookDbInstance(bookname) {
    return new Datastore({ filename: bookname + ".db", autoload: true });
}
function LoadData(callback) {
    var block = [];
    var blocks = new Datastore({ filename: 'Blocks.db', autoload: true });
    blocks.find({}).exec(function (err, block) {
        block.forEach(function (d) {
            block.push(d);
        }.bind(this));
        callback(block)
    }.bind(this));

}

function storeBook(bookName, page, pageNo) {
    var book = new Datastore({ filename: bookName + ".db", autoload: true });
    var bookDetail = {
        pageNo: pageNo,
        content: page
    }
    book.insert(bookDetail, function (err, docs) {

    }.bind(this));
}
function storeAllbooksInfo(bookid, callback) {

    var allbook = new Datastore({ filename: "books.db", autoload: true });
    allbook.remove({}, { multi: true }, function (err, num) { });
    var book = {
        id: bookid
    };

    allbook.insert(book, function (err, docs) {
        callback();
    })
}
function getAllbookInfo(callback) {
    var allbook = new Datastore({ filename: "books.db", autoload: true });
    allbook.find({}).exec(function (err, books) {
        callback(books)
    });
}
function getBook(bookname, page, callback) {
    var book = getbookDbInstance(bookname);
    if (typeof page != "undefined") {
        book.find({ pageNo: page.toString() }, function (err, pages) {
            callback(pages[0])
        });
    }
    else {
        book.find({}, function (err, pages) {
            callback(pages)
        });
    }

}
function getbookTotalPages(bookname, callback) {
    var book = getbookDbInstance(bookname);
    book.find({}, function (err, pages) {
        callback(pages.length);
    })
}

function removeBook(bookname, callback) {
    var book = getbookDbInstance(bookname);
    book.remove({}, { multi: true }, function (err, num) {
        callback();
    });
}
export {
    LoadData,
    storeBook,
    getBook,
    storeAllbooksInfo,
    getAllbookInfo,
    removeBook,
    getbookTotalPages
};