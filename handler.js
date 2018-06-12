const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const getGreeting = firstName => `Hello, ${firstName}.`

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    fields: {
      greeting: {
        args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString)}},
        type: GraphQLString,
        resolbe: (parent, args) => getGreeting(args.firstName)
      }
    }
  }),
});

module.exports.query = (event, context, callback) => graphql(schema, event.queryStringParameters.query)
  .then(
    result => callback(null, { statusCode: 200, body: JSON.stringify(result)}),
    err => callback(err)
  )