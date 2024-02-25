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
      return await User.findById({ _id: args.id });
    },
    budgets: async () => {
      return await Budget.find();
    },
    budget: async (parent, { userId, month, year }, context) => {
     return await Budget.findOne({ userId, month, year });
    },
    categories: async () => {
      return await Category.find();
    },
    category: async (parent, { userId, month, year, name }, context) => {
      return await Category.findOne({ userId, month, year, name });
     },
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
    addBudget: async (parent, { userId, month, year , total }, context) => {
      if (context.user) {

        const budget = await Budget.create({userId, month, year , total});
        console.log(budget);
        const user = await User.findOneAndUpdate({ _id : context.user._id }, { $addToSet: { budgets: budget._id } }, { new: true }).populate('budgets');
        console.log(user);
        return budget;
      }

      throw AuthenticationError;
    },
    updateBudget: async ( parent, { userId, month, year, total }) => {
      await Budget.findOneAndUpdate({userId, month, year}, {total});
    },
    addCategory: async ( parent, { userId, month, year, name, budget }) => {
      const category = await Category.create({ userId, month, year , name, budget });
      const update = await Budget.findOneAndUpdate({ userId, month, year }, { $addToSet: { categories : category._id } }, { new: true }).populate('categories');
      console.log(update);
      return category;
    },
    updateCategory: async ( parent, { userId, month, year, name, budget }) => {
      await Category.findOneAndUpdate({ userId, month, year, name }, { budget });
    },
   

  }
};

module.exports = resolvers;

