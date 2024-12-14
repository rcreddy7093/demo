"use client";

import React, { useEffect, useState } from "react";

const AddContribution = ({ isOpen, formData, isEditing, onChange, onSubmit, onClose }) => {
  const [users, setUsers] = useState([]); // State to store users

  useEffect(() => {
    if (isOpen) {
      // Fetch users when modal opens
      fetch("/api/users")
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render the modal if it's not open

  // Helper to format date into "YYYY-MM-DD"
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'user_id' || name === 'amount' ? Number(value) : value;

    // Call the passed onChange function with the updated value
    onChange({ target: { name, value: parsedValue } });
  };
  
  // Default to current date if no date is provided
  const currentDate = formatDate(new Date());

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button style={modalStyles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3 style={{ textAlign: "center" }}>{isEditing ? "Edit Contribution" : "Add Contribution"}</h3>
        <form onSubmit={onSubmit}>
          {/* Dropdown for User ID */}
          <select
            name="user_id"
            value={formData.user_id || null}
            onChange={handleChange}   
            required
            style={modalStyles.input}
          >
            <option value="">
              Select User
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || `User ${user.id}`}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            value={formData.amount || ""}
            onChange={handleChange}  
            placeholder="Amount"
            required
            style={modalStyles.input}
          />
          <input
            type="date"
            name="date"
            value={formData.date ? formatDate(formData.date) : currentDate} // Format for both add and edit
            onChange={onChange}
            required
            style={modalStyles.input}
          />
          <div style={modalStyles.actions}>
            <button type="submit">{isEditing ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal styles
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
};

export default AddContribution;
