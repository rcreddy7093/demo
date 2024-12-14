import React from "react";

const ContributionTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="table-container"> 

    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className={index % 2 === 0 ? "" : "odd-row"}>
            <td>{item.id}</td>
            <td>{item.userName}</td>
            <td>{item.amount}</td>
            <td>{item.date}</td>
            <td>
              <div className="actions">
                <button
                  className="button button-edit"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="button button-delete"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ContributionTable;
