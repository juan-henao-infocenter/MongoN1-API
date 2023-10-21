const {
    GraphQLString,
    GraphQLNonNull,
  } = require("graphql");
  const { UserType } = require("../types");
  const {login} = require("../resolvers/usersResolver");
  
  const userLogin = {
    type: GraphQLString,
    description: "login that retrieves a token",
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve (_, args) {return await login(args)},
  };
  
  module.exports = { userLogin };
  