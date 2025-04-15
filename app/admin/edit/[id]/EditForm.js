'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateTransaction } from './actions';
import styles from './edit.module.css';

export default function EditForm({ transaction }) {
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const transaction_title = formData.get('transaction_title');
    const amount = parseFloat(formData.get('amount'));
    const transaction_type = formData.get('transaction_type');

    // Validation
    const newErrors = [];
    if (transaction_title.length < 3 || transaction_title.length > 50) {
      newErrors.push('Transaction title must be between 3 and 50 characters.');
    }
    if (isNaN(amount) || amount <= 0 || amount >= 10000) {
      newErrors.push('Amount must be a positive number less than 10,000.');
    }
    if (transaction_type !== 'Income' && transaction_type !== 'Expense') {
      newErrors.push("Transaction type must be either 'Income' or 'Expense'.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit to API via server action
    const updatedTransaction = {
      id: formData.get('id'),
      transaction_title,
      amount,
      transaction_type,
      date: formData.get('date'),
    };

    try {
      await updateTransaction(transaction.id, updatedTransaction);
      router.push('/admin');
    } catch (error) {
      setErrors(['Error updating transaction: ' + error.message]);
    }
  }

  return (
    <div>
      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" defaultValue={transaction.id} readOnly />
        </div>
        <div className={styles.field}>
          <label htmlFor="transaction_title">Title</label>
          <input
            type="text"
            id="transaction_title"
            name="transaction_title"
            defaultValue={transaction.transaction_title}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            defaultValue={transaction.amount}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="transaction_type">Type</label>
          <select
            id="transaction_type"
            name="transaction_type"
            defaultValue={transaction.transaction_type}
            required
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={transaction.date}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}