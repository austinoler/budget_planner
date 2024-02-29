import processedData from '../client/src/components/DataVisualizations/ExpensesByBudget';

const GetExpensesByBudgetAndCategories = (processedData) => {
    const groupedExpenses = {};

    console.log('processedData:', processedData);
    // start to process the data
    if (!processedData || !processedData.budget || !processedData.budget.categories) {
        console.error('Invalid processed data structure');
        return groupedExpenses;
    }

    console.log('processedData:', processedData);

    processedData.budget.categories.forEach((category) => {
        category.expenses.forEach((expense) => {
            if (!groupedExpenses[expense.month]) {
                groupedExpenses[expense.month] = {};
            }

            if (!groupedExpenses[expense.month][category._id]) {
                groupedExpenses[expense.month][category._id] = {
                    categoryName: category.name, // Adjust this based on your actual property name
                    totalAmount: 0,
                    expenses: [],
                };
            }

            groupedExpenses[expense.month][category._id].totalAmount += expense.amount;
            groupedExpenses[expense.month][category._id].expenses.push(expense);
        });
    });

    Object.keys(groupedExpenses).forEach((month) => {
        Object.keys(groupedExpenses[month]).forEach((categoryId) => {
            groupedExpenses[month][categoryId].expenses.sort((a, b) => a.day - b.day);
        });
    });

    return groupedExpenses;
};

export default GetExpensesByBudgetAndCategories;