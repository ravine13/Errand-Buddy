import React, { useState, useEffect } from "react";
import axios from "axios";
import { retrieve } from "../Encryption";

const UserRatings = () => {
    const [ratings, setRatings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const retrievedUser = retrieve(); // Get the retrieved user from the retrieve function
    const userId = retrievedUser ? retrievedUser.sub : null; // Extract the user ID from the retrieved user

    useEffect(() => {
        setLoading(true);
        // Fetch ratings from the flask backend
        axios.get(`/rating/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(response => {
                // Check if the response is an array or a single object
                const fetchedRatings = Array.isArray(response.data)
                    ? response.data
                    : [response.data];
                setRatings(fetchedRatings);
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
