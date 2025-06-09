import React from 'react';

const UserForm = ({ form, editingId, handleChange, handleSubmit, handleSort, removeDuplicates, resetUsers, resetUsersAll, handleExportCSV }) => (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
        />
        <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
        />
        <button
            type="submit"
            className="submit-button">
            {editingId ? "Update" : "Add"}
        </button>
        <button
            type="button"
            className="submit-button"
            onClick={handleSort}>
            Sorts
        </button>
        <button
            type="button"
            className="duplicate-button"
            onClick={removeDuplicates}
        >
            Duplicate
        </button>
        <button
            type='button'
            onClick={resetUsers}
            className="submit-button"
        >
            Reset Duplicate
        </button>
        <button
            onClick={handleExportCSV}
            type='button'
            className="submit-button"
        >
            Download CSV file
        </button>

        <button
            onClick={resetUsersAll}
            className="submit-button"
        >
            Reset
        </button>
    </form>
);

export default UserForm;
