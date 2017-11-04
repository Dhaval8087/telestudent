var db = require('./pghelper');

function getBlocks(req, res, next) {
        var sql = "SELECT * FROM blocks";
        db.query(sql)
            .then(function (blocks) {
                return res.send(JSON.parse(JSON.stringify(blocks)));
            })
            .catch(next);
    }
   
    exports.getBlocks = getBlocks;