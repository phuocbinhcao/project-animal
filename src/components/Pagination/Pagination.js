import React from 'react';
import './pagination.css'

const Pagination = ({ pagination, onPageChange }) => {
    const { total_pages, current_page } = pagination;

    const handlePageCHage = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }
    return (
        <div className="pagination">
            <div className='panigation-wrapper'>
                <button className='btn' onClick={() => handlePageCHage(current_page - 1)} disabled={current_page <= 1}>{'<'}</button>
                {current_page - 1 > 0 && <p className='btn' onClick={() => handlePageCHage(current_page - 1)}>{current_page - 1}</p>}
                <p className='btn btn--active'>{current_page}</p>
                {current_page < total_pages && <p className='btn' onClick={() => handlePageCHage(current_page + 1)}>{current_page + 1}</p>}
                <button className='btn' onClick={() => handlePageCHage(current_page + 1)} disabled={current_page >= total_pages}>{'>'}</button>
            </div >
        </div >
    );
};

export default Pagination;