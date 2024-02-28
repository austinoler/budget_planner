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
      return await User.findById({ _id: args._id }).populate('budgets');
    },
    budgets: async () => {
      return await Budget.find().populate('categories');
    },
    budget: async (parent, args) => {
      return await Budget.findById({ _id: args._id }).populate({ path: 'categories', populate: { path: 'expenses', model: 'Expense' } });
    },
    categories: async () => {
      return await Category.find().populate('expenses');
    },
    category: async (parent, args) => {
      return await Category.findOne({ _id: args._id }).populate('expenses');
    },
    expenses: async () => {
      return await Expense.find();
    },
    expense: async (parent, args) => {
      return await Expense.findById({ _id: args._id });
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
    addBudget: async (parent, { userId, month, year, total }, context) => {
      const budget = await Budget.create({ userId, month, year, total });
      const user = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { budgets: budget._id } }, { new: true });
      return budget;
    },
    updateBudget: async (parent, { _id, total }) => {
      await Budget.findOneAndUpdate({ _id: _id }, { total });
    },
    addCategory: async (parent, { userId, name, budget, budgetId }) => {
      const category = await Category.create({ userId, name, budget });
      const update = await Budget.findOneAndUpdate({ _id: budgetId }, { $addToSet: { categories: category._id } }, { new: true });
      return category;
    },
    updateCategory: async (parent, { _id, budget }) => {
      await Category.findOneAndUpdate({ _id: _id }, { budget });
    },
    addExpense: async (parent, { userId, categoryName, day, month, year, amount, description, recurring, categoryId }) => {
      const expense = await Expense.create({ userId, categoryName, day, month, year, amount, description, recurring });
      const update = await Category.findOneAndUpdate({ _id: categoryId }, { $addToSet: { expenses: expense._id } }, { new: true });
      return expense;
    },
    updateExpense: async (parent, args) => {
      const id = args._id;
      delete args._id;
      await Expense.findByIdAndUpdate(id, args, { new: true })
    },
    deleteExpense: async (parent, { _id, categoryId }) => {
      const result = await Expense.findByIdAndDelete({ _id: _id })
      const update = await Category.findOneAndUpdate({ _id: categoryId }, { $pull: { expenses: _id } }, { new: true });
    }
  }
}
module.exports = resolvers