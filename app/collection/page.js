import Link from 'next/link';
import styles from './collection.module.css';

async function getTransactions() {
  const res = await fetch('http://localhost:4000/transactions', {
    next: { revalidate: 0 }, // Ensure fresh data
  });
//   if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export default async function Collection() {
  let transactions;
  try {
    transactions = await getTransactions();
  } catch (error) {
    return <div>Error loading transactions: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Financial Transactions</h1>
      <div className={styles.list}>
        {transactions.map((transaction) => (
          <div key={transaction.id} className={styles.item}>
            <span>{transaction.id}: {transaction.transaction_title}</span>
            <Link href={`/collection/${transaction.id}`}>more</Link>
          </div>
        ))}
      </div>
    </div>
  );
}