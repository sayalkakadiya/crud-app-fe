import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => (
    <div
        style={{ marginTop: "20px", display:"flex", justifyContent:"center" }}
    >
        <button
            onClick={() =>
                setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}>
            Previous
        </button>
        <span
            style={{ margin: "0 10px" }}>
            Page {page} of {totalPages}
        </span>
        <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}>
            Next
        </button>
    </div>
);

export default Pagination;
