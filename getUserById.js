import React, { useState, useEffect } from 'react';

function GetUserPageById() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserById = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.mungnx.net/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) return;
    fetchUserById(userId);
  };

  return (
    <div>
      <h1>Search user by ID</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter User ID:
          <input type="text" value={userId} onChange={handleInputChange} />
        </label>
        <button type="submit">Get User</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {userData && (
        <div>
          <h2>User Details</h2>
          <p>ID: {userData.PK}</p>
          <p>Name: {userData.name}</p>
          {/* Additional user details can be displayed here */}
        </div>
      )}
    </div>
  );
}

export default GetUserPageById;
