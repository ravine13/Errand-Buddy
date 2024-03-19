import React, { useState, useEffect } from "react";
import axios from "axios";
import { retrieve } from "../Encryption";

const UserPayments = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const retrievedUser = retrieve();
    const userId = retrievedUser ? retrievedUser.sub : null;

    useEffect(() => {
        setLoading(true);
        // Fetch payments from the flask backend
        axios.get(`/payments/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(response => {

                // Check if the response is an array or a single object
                const fetchedPayments = Array.isArray(response.data)
                    ? response.data
                    : [response.data];

                setPayments(fetchedPayments);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
                setError('Error fetching payments');
                setLoading(false);
            })
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="content-wrapper" style={{ marginLeft: "280px", backgroundColor: "white", marginTop: "20px" }}>
            <h1>User Payments</h1>
            {payments.map(payment => (
                <div key={payment.id}>
                    <h2>Payment ID: {payment.id}</h2>
                    <p>Amount: {payment.amount}</p>
                    <p>Status: {payment.status}</p>
                    <p>Payment Method: {payment.payment_method}</p>
                </div>
            ))}
        </div>
    );
};

export default UserPayments;
