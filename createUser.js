import React, { useState } from 'react';

function AddUser({ onAddUser }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const response = await fetch('https://api.mungnx.net/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      const data = await response.json();
      onAddUser(data);
      setName(''); // Reset the input field after successful addition
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUser;
