import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPayments = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('jwt');

    useEffect(() => {
        setLoading(true);
        // Fetch payments from the flask backend
        axios.get(`/payments/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(response => {
                setPayments(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
                setError('Error fetching payments');
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>User Payments</h1>
            {payments.map(payment => (
                <div key={payment.id}>
                    <h2>Payment ID: {payment.id}</h2>
                    <p>Amount: {payment.amount}</p>
                    <p>Status: {payment.status}</p>
                    <Payment Method={payment.payment_method}/>
                </div>
            ))}
        </div>
    );
};

export default UserPayments;