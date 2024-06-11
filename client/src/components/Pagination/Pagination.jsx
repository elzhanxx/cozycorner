import React from 'react';
import './Pagination.scss';

const Pagination = ({ maxPages, currentPage, onPageChange }) => {
    const handleClick = (page) => {
        if (page >= 1 && page <= maxPages) {
            onPageChange(page);
        }
    };

    const renderPages = () => {
        let pages = [];
        for (let i = 1; i <= maxPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-item ${i === currentPage ? 'active' : ''}`}
                    onClick={() => handleClick(i)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            <button className="nav-button" onClick={() => handleClick(currentPage - 1)}>&lt;</button>
            {renderPages()}
            <button className="nav-button" onClick={() => handleClick(currentPage + 1)}>&gt;</button>
        </div>
    );
};

export default Pagination;
