
import Datastore from 'nedb';

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
function InsertData(callback) {
    var blocks = new Datastore({ filename: 'Blocks.db', autoload: true });
    blocks.remove({}, {
        multi: true
    }, function (err, num) {
    }.bind(this));
    var blocksData = [];
    var block;
    block = {
        metadataId: 1,
        value: 'https://www.npmjs.com/package/sequential-guid'
    };
    blocksData.push(block);

    block = {
        metadataId: 2,
        value: 'The <P> element is used to define a paragraph. The exact rendering (indentation,' +
            ' leading etc.) is not defined and may be a function of other tags, style sheets,' +
            ' etc. The ALIGN attribute can be used to explicitly specify the horizontal align' +
            'ment. Paragraph elements have the same content model as headers, that is text an' +
            'd character level markup, such as character emphasis, inline images, form fields' +
            ' and math. '
    };
    blocksData.push(block);

    block = {
        metadataId: 3,
        value: "\int_0^\infty x^2 dx"
        // value: "\int_{a}^{b} f(x)dx = F(b) - F(a)"
    };
    blocksData.push(block);
    blocks.insert(blocksData, function (err, docs) {
        callback(blocksData)
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

    console.log(book)
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
function getBook(bookname, callback) {
    var book = getbookDbInstance(bookname);
    book.find({}).exec(function (err, pages) {
        callback(pages)
    });
}

function removeBook(bookname, callback) {
    var book = getbookDbInstance(bookname);
    book.remove({}, { multi: true }, function (err, num) {
        callback();
    });
}
export {
    LoadData,
    InsertData,
    storeBook,
    getBook,
    storeAllbooksInfo,
    getAllbookInfo,
    removeBook
};