import React from 'react';

export default function MyContributionTable({ data }) {
    // Sort data by date in descending order (most recent first)
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Function to format date as "Feb 2024"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
    };

    return (
        <div>
            <div className="grid">
                {sortedData.map((item, index) => (
                    <div key={index} className="card">
                        <h3>{item.amount}</h3>
                        <div>{formatDate(item.date)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
