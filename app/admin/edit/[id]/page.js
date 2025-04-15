import EditForm from './EditForm';
import styles from './edit.module.css';

async function getTransaction(id) {
  try {
    const res = await fetch(`http://localhost:4000/transactions/${id}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return null;
  }
}

export default async function EditPage({ params }) {
  const transaction = await getTransaction(params.id);

  if (!transaction) {
    return <div>No transaction found with ID {params.id}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Transaction</h1>
      <EditForm transaction={transaction} />
    </div>
  );
}