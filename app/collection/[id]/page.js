import Link from 'next/link';
import styles from './collection-id.module.css';

async function getTransaction(id) {
  const res = await fetch(`http://localhost:4000/transactions/${id}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/transactions');
  const transactions = await res.json();
  return transactions.slice(0, 10).map((transaction) => ({
    id: transaction.id,
  }));
}

export default async function TransactionPage({ params }) {
  const transaction = await getTransaction(params.id);

  if (!transaction) {
    return <div>No transaction found with ID {params.id}</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/collection" className={styles.back}>back</Link>
      <h1>Transaction Details</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{transaction.id}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{transaction.transaction_title}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>${transaction.amount.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{transaction.transaction_type}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{transaction.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}