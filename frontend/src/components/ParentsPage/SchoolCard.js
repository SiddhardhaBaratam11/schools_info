import React from 'react';
import './SchoolCard.css';

const SchoolCard = ({ school, onEdit, onDelete, editable }) => {
  return (
    <div className="school-card">
      {school.picture && (
                  <img
                    src={`${school.picture}`}
                    alt={school.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                )}
      <h2>{school.name}</h2>
      <p>Fees: {school.fees}</p>
      <p>{school.details}</p>
      {editable && (
        <div className="button-container">
          <button onClick={() => onEdit(school)}>Edit</button>
          <button onClick={() => onDelete(school._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default SchoolCard;
