import React from "react";
import AddIcon from '../../assets/add.png';

function AddMemberBtn({onButtonClick}) {
  return (
    <div className="overdue-filter-container">
        <div className="filter-img add-member-icon">
            <img src={AddIcon} alt="add icon" />
        </div>

        <button className="add-member-btn" onClick={onButtonClick}>
            <h4>Add Member</h4>
        </button>

    </div>
  );
}

export default AddMemberBtn;
