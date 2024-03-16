import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRatings = () => {
    const [ratings, setRatings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('jwt');

    useEffect(() => {
        setLoading(true);
        // Fetch ratings from the flask backend
        axios.get(`/ratings/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(response => {
                setRatings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching ratings:', error);
                setError('Error fetching ratings');
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="content-wrapper" style={{ marginLeft: "280px", backgroundColor: "white", marginTop: "20px" }}>
            <h1>User Ratings</h1>
            {ratings.map(rating => (
                <div key={rating.id}>
                    <h2>Rating ID: {rating.id}</h2>
                    <p>Rating: {rating.rating}</p>
                    <p>Review: {rating.review}</p>
                </div>
            ))}
        </div>
    );
};

export default UserRatings;
