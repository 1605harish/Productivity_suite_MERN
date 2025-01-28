import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  // Fetch expenses from the backend
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await axios.get('http://localhost:5000/api/expenses');
    setExpenses(response.data);
  };

  const addExpense = async () => {
    if (title.trim() && amount > 0 && category.trim()) {
      const response = await axios.post('http://localhost:5000/api/expenses', {
        title,
        amount,
        category,
      });
      setExpenses([...expenses, response.data]);
      setTitle('');
      setAmount('');
      setCategory('');
    }
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    setExpenses(expenses.filter((expense) => expense._id !== id));
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.title} - ${expense.amount} ({expense.category})
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;