var pg = require('pg');
const {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
  } = require('graphql');

var config = require('../api/config');
console.log(config.prodURL);
const pgpool = new pg.Pool(config.prodURL);
let Schema = () => {

    let blockType = new GraphQLObjectType({
        name: 'blocks',
        fields: () => ({
            uuid: { type: GraphQLString },
            metadataId: { type: GraphQLInt },
            value: { type: GraphQLString }
        })
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                blocks: {
                    type: new GraphQLList(blockType),
                    resolve: () => {
                        return pgpool.query(`SELECT * FROM blocks`, []).then((result) => result.rows);
                    }
                }
            })
        })
    });

    return schema
};
module.exports = Schema;

