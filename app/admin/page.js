import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import styles from './admin.module.css';

async function getTransactions() {
  const res = await fetch('http://localhost:4000/transactions', {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

async function deleteTransaction(formData) {
  'use server';
  const id = formData.get('id');
  await fetch(`http://localhost:4000/transactions/${id}`, {
    method: 'DELETE',
  });
  revalidatePath('/collection');
  revalidatePath(`/collection/${id}`);
  revalidatePath('/admin');
}

export default async function Admin() {
  let transactions;
  try {
    transactions = await getTransactions();
  } catch (error) {
    return <div>Error loading transactions: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Admin - Manage Transactions</h1>
      <Link href="/admin/create" className={styles.createLink}>create new</Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.transaction_title}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.transaction_type}</td>
              <td>{transaction.date}</td>
              <td>
                <form action={deleteTransaction}>
                  <input type="hidden" name="id" value={transaction.id} />
                  <button type="submit">D</button>
                </form>
              </td>
              <td>
                <Link href={`/admin/edit/${transaction.id}`}>E</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}