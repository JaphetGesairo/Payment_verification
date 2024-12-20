import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import OrderForm from './components/OrderForm';
import Payment from './components/Payment';
import Transaction from './components/Transaction';
import Verification from './components/Verification';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/menu">Menu</Link> |{' '}
                    <Link to="/order">Order</Link> | <Link to="/payment">Payment</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/order" element={<OrderForm />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/transaction/:id" element={<Transaction />} />
                    <Route path="/verification/:id" element={<Verification />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
