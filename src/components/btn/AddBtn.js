import React from "react";
import AddIcon from '../../assets/add.png';

function AddBtn({onButtonClick, content, icon, additionalClass}) {
  return (
    <div className={`overdue-filter-container ${additionalClass}`} style={{ margin: 0 }}>
        <div className="filter-img add-member-icon">
            <img src={icon} alt="icon" />
        </div>

        <button className="add-member-btn" onClick={onButtonClick}>
            <h4>{content}</h4>
        </button>

    </div>
  );
}

export default AddBtn;


