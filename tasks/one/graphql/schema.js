const graphql = require("graphql");
const Candlestick = require("../database/models/candlestick");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const CandlestickType = new GraphQLObjectType({
  name: "Candlestick",
  fields: () => ({
    id: { type: GraphQLID },
    symbol: { type: GraphQLString },
    data: {
      type: new GraphQLObjectType({
        name: "CandlestickData",
        fields: () => ({
          open: { type: GraphQLFloat },
          high: { type: GraphQLFloat },
          low: { type: GraphQLFloat },
          close: { type: GraphQLFloat },
          volume: { type: GraphQLFloat },
        }),
      }),
    },
    timestamp: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    candlesticks: {
      type: new GraphQLList(CandlestickType),
      args: { symbol: { type: GraphQLString } },
      resolve(parent, args) {
        if (args.symbol) {
          return Candlestick.find({ symbol: args.symbol });
        }
        return Candlestick.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
