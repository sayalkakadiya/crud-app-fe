import React from 'react';
import './UserCrud.css';

const UserFilter = ({ filters, setFilters, handleFilter, clearFilter }) => (
    <>
        <h4 style={{ marginTop: "10px" }}>filter data:</h4>
        <form style={{ margin: "10px 0" }}>
            <input
                type="text"
                placeholder="Filter by name"
                name="name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                style={{ marginRight: "10px" }}
            />
            <input
                type="text"
                placeholder="Filter by email"
                name="email"
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                style={{ marginRight: "10px" }}
            />
            <button
                type="button"
                onClick={handleFilter}
                className="submit-button">
                Search
            </button>
            <button
                type="button"
                onClick={clearFilter}
                className="clear-button"
                style={{ marginLeft: "10px" }}>
                Clear
            </button>
        </form>
    </>
);

export default UserFilter;
