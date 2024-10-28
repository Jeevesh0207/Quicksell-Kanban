import React from 'react';

function Loading() {
    return (
        <div className="Loading">
            <h1>Welcome to Quicksell!</h1>
            <p className="loading-text">Please wait while we prepare your experience...</p>
            <div className="loader"></div>
        </div>
    );
}

export default Loading;
