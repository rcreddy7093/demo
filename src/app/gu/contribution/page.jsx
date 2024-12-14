"use client";
import React, { useState, useEffect } from "react";
import ContributionTable from "./ContributionTable";
import AddContribution from "./AddContribution";
import ContributionPieChart from "./ContributionPieChart";
import ContributionLineChart from "./ContributionLineChart";
import styles from "./contribution.module.css";


const ContributionPage = () => {
  const [data, setData] = useState([]); // Table data
  const [formData, setFormData] = useState({ id: null, user_id: "", amount: "", date: "" }); // Form data
  const [isEditing, setIsEditing] = useState(false); // Editing mode
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch all data
  const fetchData = async () => {
    try {
      const response = await fetch("/api/contribution"); // Adjust endpoint
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Open modal
  const openModal = (item = { id: null, user_id: "", amount: "", date: "" }) => {
    setFormData(item);
    setIsEditing(!!item.id);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ id: null, user_id: "", amount: "", date: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = "/api/contribution";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchData(); // Refresh data
        closeModal(); // Close modal
      } else {
        console.error("Error saving data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/contribution?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchData(); // Refresh data
      } else {
        console.error("Error deleting data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="alignCenter">Contributions</h2>
      <div className='containerRight'>
        <button className='containerRightButton' onClick={() => openModal()}>Add Contribution</button>
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chart}>
          <ContributionPieChart data={data} />
        </div>
        <div className={styles.chart}>
          <ContributionLineChart data={data} />
        </div>
      </div>

      <ContributionTable data={data} onEdit={openModal} onDelete={handleDelete} />
      <AddContribution
        isOpen={isModalOpen}
        formData={formData}
        isEditing={isEditing}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>

  );
};

export default ContributionPage;
