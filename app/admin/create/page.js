import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import styles from './create.module.css';

async function createTransaction(formData) {
  'use server';
  const transaction = {
    id: formData.get('id'),
    transaction_title: formData.get('transaction_title'),
    amount: parseFloat(formData.get('amount')),
    transaction_type: formData.get('transaction_type'),
    date: formData.get('date'),
  };
  await fetch('http://localhost:4000/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  revalidatePath('/collection');
  revalidatePath('/admin');
  redirect('/admin');
}

export default function Create() {
  return (
    <div className={styles.container}>
      <h1>Create New Transaction</h1>
      <form action={createTransaction} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="transaction_title">Title</label>
          <input type="text" id="transaction_title" name="transaction_title" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" step="0.01" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="transaction_type">Type</label>
          <select id="transaction_type" name="transaction_type" required>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}