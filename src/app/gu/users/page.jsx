"use client"
import { useEffect, useState,Suspense } from 'react';
import Popup from './addUser';
import { useSearchParams } from 'next/navigation';

const UsersPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const searchParams = useSearchParams();

    const role = searchParams.get('role');


    const fetchUsers = useCallback(async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    }, []); 
  
    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);

  const handleAddUserClick = () => {
    setEditingUser(null);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setEditingUser(null); 
  };

  const handlePopupSubmit = async (e, formData) => {
    e.preventDefault();

    const newUser = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      role: formData.role,
    };

    if (editingUser) {
      try {
        await fetch(`/api/users`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newUser, id: editingUser.id }),
        });
      } catch (error) {
        setError("Error updating user.");
      }
    } else {
      // Add new user
      try {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
      } catch (error) {
        setError("Error adding user.");
      }
    }

    fetchUsers();
    setShowPopup(false);
  };

  const handleDeleteClick = async (id) => {
    try {
      await fetch(`/api/users?id=${id}`, {
        method: 'DELETE',
      });
      fetchUsers(); 
    } catch (error) {
      setError("Error deleting user.");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowPopup(true);
  };

  return (
    <div>
      <h2 className='alignCenter'>Users List</h2>

      <div className='containerRight'>
        <button onClick={handleAddUserClick} className='containerRightButton'>Add User</button>
      </div>
      <Popup
        show={showPopup}
        onClose={handlePopupClose}
        onSubmit={handlePopupSubmit}
        initialData={editingUser} 
      />

      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Password</th>
                <th>Role</th>
                {role === "SUPERADMIN" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? "" : "odd-row"}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  {role === "SUPERADMIN" && (
                    <td>
                      <div className="actions">
                        <button onClick={() => handleEditClick(user)} className="button button-edit">Edit</button>
                        <button onClick={() => handleDeleteClick(user.id)} className="button button-delete"> Delete </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersPage />
    </Suspense>
  );
}