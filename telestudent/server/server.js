var express = require('express');
var fs = require('fs');
var Schema = require('./data/schema');
var GraphQLHTTP = require('express-graphql');

  
let app = express();
let schema = Schema()
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true
}));

app.listen(3200, function () {
    console.log('Express server listening on port ' + app.get('port'));
});


    /*let json = await graphql(schema, introspectionQuery);
    fs.writeFile('../data/schema.json', JSON.stringify(json, null, 2), err => {
        if (err) throw err;

        console.log('schema file created');
    })*/




