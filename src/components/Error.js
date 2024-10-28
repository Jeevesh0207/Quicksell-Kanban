import React from 'react';

function Error() {
    return (
        <div className="error-container">
            <h1 className="error-title">Oops! Something Went Wrong.</h1>
            <p className="error-text">We're having trouble loading the page. Please try again later.</p>
            <button className="error-button" onClick={() => window.location.reload()}>
                Reload Page
            </button>
        </div>
    );
}

export default Error;
