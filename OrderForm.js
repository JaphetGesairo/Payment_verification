import React, { useState } from 'react';
import axios from 'axios';

function OrderForm() {
    const [name, setName] = useState('');
    const [items, setItems] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset error message
        setErrorMessage('');

        // Validate customer name
        if (!name.trim()) {
            setErrorMessage('Customer name is required.');
            return;
        }

        // Validate and parse items JSON
        let parsedItems;
        try {
            console.log('Items input:', items); // Debugging output
            parsedItems = JSON.parse(items);
            if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
                throw new Error('Items should be a non-empty array.');
            }
        } catch (error) {
            setErrorMessage(`Invalid JSON format: ${error.message}`);
            return;
        }

        // Submit the order
        axios
            .post('http://localhost:3000/menu_orders', { customer_name: name, items: parsedItems })
            .then((response) => {
                alert('Order submitted successfully!');
                setName('');
                setItems('');
            })
            .catch((error) => {
                console.error('API Error:', error);
                setErrorMessage('Failed to submit the order. Please try again.');
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder='Order Items (e.g., [{"menu_id": 1, "quantity": 2, "price": 5.5}])'
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                />
                <button type="submit">Submit Order</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default OrderForm;
