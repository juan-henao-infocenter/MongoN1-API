const { GraphQLString, GraphQLNonNull } = require("graphql");
const { UserType } = require("../types");
const { login, getUser } = require("../resolvers/usersResolver");

const userLogin = {
  type: GraphQLString,
  description: "login that retrieves a token",
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args) {
    return await login(args);
  },
};

const user = {
  type: UserType,
  description: "retrives an user by token",
  async resolve(_, args, context) {
    console.log(context.user);
    if (context.user) {
      return await getUser(context.user.userId);
    } else {
      throw new Error("Unauthorized");
    }
  },
};

const createUser = {
  type: UserType,
  description: "creates a user with the properties of name, email and password",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args) {
    return await createUserService(args);
  },
};

module.exports = { userLogin, user, createUser };
