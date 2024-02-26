import React, { useState, useEffect } from 'react';
import AddUser from './createUser'; // Import AddUser component
import './styles.css';

function GetUserPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data only on initial component mount

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.mungnx.net/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]); // Add the new user to the existing user list
  };

  return (
    <div>
      <h1>Create New User</h1>
      <AddUser onAddUser={handleAddUser} />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <h2>User List</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.PK} className="user-list-item">
            ID: {user.PK} <br/>
            Name: {user.name}
          </li>
        ))}
      </ul>
      <h1>Check CI/CD</h1>
    </div>
  );
}

export default GetUserPage;
