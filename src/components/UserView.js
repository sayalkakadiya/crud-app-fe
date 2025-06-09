import React from 'react';

const UserView = ({ viewUser, setViewUser }) => (
    <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    >
        {viewUser && (
            <div style={{ marginTop: "20px", border: "2px solid #ccc", padding: "20px 30px" }}>
                <h3>Viewed User</h3>
                <p>Name: {viewUser.name}</p>
                <p>Email: {viewUser.email}</p>
                <p>Password: {viewUser.password}</p>
                <button onClick={() => setViewUser(null)}>Close</button>
            </div>
        )}
    </div>
);

export default UserView;    
