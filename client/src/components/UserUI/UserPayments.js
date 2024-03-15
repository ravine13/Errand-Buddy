import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPayments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // Fetch payments from the flask backend
        axios.get('/payments')
            .then(response => {
                setPayments(response.data);
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
            });
    }, []);

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