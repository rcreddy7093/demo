// components/Popup.js
import React, { useEffect, useState } from 'react';
import styles from "./addUser.module.css";

const Popup = ({ show, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        phoneNumber: initialData.phoneNumber,
        password: initialData.password,
        role: initialData.role,
      });
    } else {
      setFormData({
        name: '',
        phoneNumber: '',
        password: '',
        role: '',
      });
    }
  }, [initialData]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, formData);
    // Reset the form after submission
    setFormData({
      name: '',
      phoneNumber: '',
      password: '',
      role: '',
    });
  };


  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>{initialData ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <br />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className={styles.dropdown}
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
          <br />
          <div className={styles.buttonContainer}>
    <button type="submit" className={styles.submitButton}>
      {initialData ? 'Update' : 'Submit'}
    </button>
  </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
