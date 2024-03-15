import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRatings = () => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        // Fetch ratings from the flask backend
        axios.get('/ratings')
            .then(response => {
                setRatings(response.data);
            })
            .catch(error => {
                console.error('Error fetching ratings:', error);
            });
    }, []);

    return (
        <div>
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