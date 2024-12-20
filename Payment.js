import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
    const [orderId, setOrderId] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/payment', { orderId, amount, method })
            .then((response) => alert('Payment successful!'))
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="">Select Method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
            </select>
            <button type="submit">Submit Payment</button>
        </form>
    );
}

export default Payment;
