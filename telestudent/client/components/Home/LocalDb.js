
import Datastore from 'nedb';

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
export {
    LoadData,
    InsertData,
  };