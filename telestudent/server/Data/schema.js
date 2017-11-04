import pg from 'pg';

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
    cursorForObjectInConnection
} from 'graphql-relay';

import config from '../config/environment';

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        if (type === 'Blocks') {
            return getBlocks();
        }
        return null;
    },
    (obj) => {
        if (obj instanceof Blocks) {
            return blockType;
        }
        return null;
    }
);
console.log(config.devURL);
const pgpool = new pg.Pool(config.devURL);

const blockType = new GraphQLObjectType({
    name: 'Blocks',
    description: 'A person who uses our app',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        metadataId: { type: GraphQLInt },
        value: { type: GraphQLString }
    }),
    interfaces: [nodeInterface]
});


const lstBlockType= new GraphQLObjectType({
    name:'lstType',
    fields:()=>({
        blocks:{
            type: new GraphQLList(blockType),
            resolve:()=>getBlocks()
        }
    })
});
const queryType = new GraphQLObjectType({
    name: 'Query',
    interfaces: [nodeInterface],
    fields: {
        id: globalIdField('Viewer', () => 'id'),
        viewer: {
            type: lstBlockType,
            resolve: () => {
                return getBlocks();
            }
        }
    }
    
});

function getBlocks() {
    return pgpool.query(`SELECT * FROM blocks`, []).then((result) => result.rows);
}

class Blocks {
    constructor(id, metadataId, value) {
        this.Id = id;
        this.metadataId = metadataId;
        this.value = value;
    }
}
export default new GraphQLSchema({
    query: queryType
});

