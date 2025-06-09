import React from 'react';

const UserTable = ({ users, startEdit, deleteUser, viewUserById }) => {
    if (!users.length) return <p>No users found.</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user._id || index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                            <button onClick={() => viewUserById(user._id)} className="table-action-btn view-btn">View</button>
                        </td>
                        <td>
                            <button onClick={() => startEdit(user)} className="table-action-btn edit-btn">Edit</button>
                        </td>
                        <td>
                            <button onClick={() => deleteUser(user._id)} className="table-action-btn delete-btn">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
