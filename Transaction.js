import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Transaction() {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/transactions/${id}`)
            .then((response) => setTransaction(response.data.data))
            .catch((error) => console.error(error));
    }, [id]);

    if (!transaction) return <p>Loading...</p>;

    return (
        <div style={styles.container}>
            <h1>Transaction Details</h1>
            <p>Transaction ID: {transaction.id}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Method: {transaction.payment_method}</p>
        </div>
    );
}

const styles = { container: { padding: '20px' } };

export default Transaction;
