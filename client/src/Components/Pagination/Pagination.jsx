import React from 'react';
import './Pagination.css';

export const Pagination = ({ postPerPage, totalPosts, setCurrentPage, currentPage }) => {

    let pages = [];

    //CREATING PAGE NUMBERS
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i);
    };

    return (
        <div className="pagination-container">
            {pages.map((page, index) => {
                return <button 
                key={index} 
                onClick={() => setCurrentPage(page)}
                className={`pagination ${currentPage === page ? 'active' : ''}`}
                >{page}</button>
            })}
        </div>
    );
};
