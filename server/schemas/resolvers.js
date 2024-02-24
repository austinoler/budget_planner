const { User, Budget, Category, Expense } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    users: async () => {
      return await User.find();
    },
    user: async (parent, args) => {
      return await User.findById({ _id: args.id })
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addBudget: async (parent, args, context) => {
      if (context.user) {
        const budget = await Budget.create({args});
        await User.findByIdAndUpdate({ _id : context.user._id }, { $addToSet: { budgets: budget._id } }, { new: true });
        return budget;
      }

      throw AuthenticationError;
    }
  }
};

module.exports = resolvers;
