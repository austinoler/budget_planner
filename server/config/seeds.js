const db = require('./connection');
const { User, Budget, Category, Expense } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Budget', 'budgets');
  await cleanDB('Category', 'categories');
  await cleanDB('Expense', 'expenses');
  await cleanDB('User', 'users');


  const user = await User.create({
    "firstName": "test",
    "lastName": "test",
    "email": "test@test.com",
    "password": "test123"
  });

  console.log('user seeded');

  const expenses = await Expense.insertMany([
    {
      "userId": user._id,
      "categoryName": "Food",
      "day": 2,
      "month": 3,
      "year": 2023,
      "amount": 444,
      "description": "Pizza",
      "recurring": true
    },
    {
      "userId": user._id,
      "categoryName": "Housing",
      "day": 22,
      "month": 11,
      "year": 2023,
      "amount": 300,
      "description": "plumbing",
      "recurring": true
    },
    {
      "userId": user._id,
      "categoryName": "Transportation",
      "day": 29,
      "month": 8,
      "year": 2023,
      "amount": 50,
      "description": "gas",
      "recurring": true
    },
    {
      "userId": user._id,
      "categoryName": "Food",
      "day": 19,
      "month": 11,
      "year": 2023,
      "amount": 44,
      "description": "cheese",
      "recurring": true
    },
    {
      "userId": user._id,
      "categoryName": "Housing",
      "day": 30,
      "month": 12,
      "year": 2023,
      "amount": 100,
      "description": "windows",
      "recurring": true
    },
    {
      "userId": user._id,
      "categoryName": "Food",
      "day": 20,
      "month": 1,
      "year": 2024,
      "amount": 20,
      "description": "spaghetti",
      "recurring": true
    },
    {
      "userId": user._id,
      "categoryName": "Misc",
      "day": 21,
      "month": 10,
      "year": 2023,
      "amount": 4334,
      "description": "laptop",
      "recurring": true
    },
    {
      "userId": user._id,
      "categoryName": "Transportation",
      "day": 12,
      "month": 4,
      "year": 2023,
      "amount": 444,
      "description": "bus",
      "recurring": true
    },
    {
      "userId": user._id,
      "categoryName": "Misc",
      "day": 21,
      "month": 1,
      "year": 2023,
      "amount": 32,
      "description": "stuff",
      "recurring": true
    },
  ])


  console.log('expenses seeded');
  
    const categories = await Category.insertMany([
      {
        "userId": user._id,
        "name": "Housing",
        "budget": 500,
        "expenses": [expenses[1]._id,expenses[4]._id]
      },
      {
        "userId": user._id,
        "name": "Transportation",
        "budget": 100,
        "expenses": [expenses[2]._id,expenses[7]._id]

      },
      {
        "userId": user._id,
        "name": "Food",
        "budget": 300,
        "expenses": [expenses[0]._id,expenses[3]._id,expenses[5]._id]

      },
      {
        "userId": user._id,
        "name": "Misc",
        "budget": 250,
        "expenses": [expenses[6]._id,expenses[8]._id]

      },
    ]);

  const budget = await Budget.insertMany([
    {
      "userId": user._id,
      "month": 1,
      "year": 2024,
      "total": 333,
      "categories": [categories[0],categories[1],categories[2],categories[3],]
    },
    {
      "userId": user._id,
      "month": 2,
      "year": 2024,
      "total": 111
    },
    {
      "userId": user._id,
      "month": 3,
      "year": 2024,
      "total": 222
    },
    {
      "userId": user._id,
      "month": 5,
      "year": 2024,
      "total": 444
    },

  ])

  console.log('budgets seeded');


  console.log('categories seeded');

  await User.findByIdAndUpdate({_id: user._id}, { $addToSet: { budgets: budget[0]._id } });
  await User.findByIdAndUpdate({_id: user._id}, { $addToSet: { budgets: budget[1]._id } });
  await User.findByIdAndUpdate({_id: user._id}, { $addToSet: { budgets: budget[2]._id } });
  await User.findByIdAndUpdate({_id: user._id}, { $addToSet: { budgets: budget[3]._id } });



  process.exit();
});
