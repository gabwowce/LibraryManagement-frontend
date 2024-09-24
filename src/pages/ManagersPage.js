import React, { useState, useEffect } from 'react';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';
import DataTable from '../components/DataTable';
import MemberDetailsPopup from '../components/popups/MemberDetailsPopup';
import BtnPopupDetails from '../components/btn/BtnPopupDetails';
import { useDataByIdContext } from '../context/DataByIdContext';
import detailsIcon from '../assets/details.png';
import SearchBar from '../components/SearchBar';
import AddMemberPopup from '../components/popups/AddMemberPopup';
import AddBtn from '../components/btn/AddBtn';
import AddMemberIcon from '../assets/add.png';
import AddNewLoanPopup from '../components/popups/AddNewLoanPopup';
import { useUpdateDataContext } from '../context/UpdateDataContext';
import ReturnBookPopup from '../components/popups/ReturnBookPopup';
import DeleteConfirmPopup from '../components/popups/DeleteConfirmPopup';
import { useAuthContext } from '../context/AuthContext';

import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

function ManagersPage() {
  const { managersTableColumns, centeredManagersTableColumns} = useTableColumnsContext();
  const { fetchMemberDataById, fetchBookDataById, memberData, deleteMember, confirmationMessage, errorMessage  } = useDataByIdContext();
  const { adminsAndManagersData } = useDataContext();
  const { returnBook } = useUpdateDataContext();

  const [openPopup, setOpenPopup] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredManagersData, setFilteredManagersData] = useState(adminsAndManagersData);
  const [loansData, setLoansData] = useState([]);

  const {user} = useAuthContext();

  useEffect(() => {
    const handleSearch = () => {
        if (searchQuery.length >= 3) {
            const filteredData = adminsAndManagersData.filter(manager =>
                manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                manager.surname.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredManagersData(filteredData); 
        } else {
            setFilteredManagersData(adminsAndManagersData); 
        }
    };
    
    handleSearch();
  }, [searchQuery, adminsAndManagersData]);

  const handleConfirmDelete = async () => {
    await deleteMember(selectedMemberId);
    setSelectedMemberId(null);
}

  

  const handleAddManagerClick = () => {
    setOpenPopup('addManager');
  };

  const handleDetailsClick = async (managerId) => {
    setSelectedMemberId(managerId);
    setOpenPopup('managerDetails');
    await fetchMemberDataById(managerId);
  };

  const handleDeleteClick = (managerId) => {
    setSelectedMemberId(managerId); 
    setOpenPopup('deleteManager'); 
  };

  const closePopup = () => {
    setOpenPopup(null);
    setSelectedMemberId(null);
    setLoansData([]); 
  };

  const renderCell = (key, rowData) => {
    if (key === 'loans') {
      const activeLoans = rowData[key].filter(loan => loan.status === "Active");
      return <span className='loansAmount'>{activeLoans.length}</span>;
    } else if (key === 'action') {
      return (
        <div className='btn-deatails-container'>
          <div className='edit-delete-container-member-page'>
            <BtnPopupDetails
              btnClassName="btn-edit"
              icon={editIcon}
              onButtonClick={() => handleDetailsClick(rowData.id)}
            />
            <BtnPopupDetails 
              btnClassName="btn-delete" 
              icon={deleteIcon}
              onButtonClick={() => handleDeleteClick(rowData.id)}
            />
          </div>


        </div>
      );
    }else if (key === 'dateOfBirth') {

      const dateOfBirth = new Date(rowData[key]);
      const formattedDate = dateOfBirth.toISOString().split('T')[0]; 
      return <span>{formattedDate}</span>;
  }
    return rowData[key];
  };

  return (
    <div className='member-page-container'>
      <div className='member-page-header'>
        <h1 className='members-title'>Managers</h1>
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          placeholder="Search..."
        />
        {user.role === 'admin' && (
           <AddBtn onButtonClick={handleAddManagerClick}
           content="Add Manager"
           icon={AddMemberIcon} />
        )}
        
      </div>

      <DataTable
        tableColumns={managersTableColumns}
        tableData={filteredManagersData} 
        centeredColumns={centeredManagersTableColumns}
        renderCell={renderCell}
      />

      {openPopup === 'managerDetails' && (
        <MemberDetailsPopup
          isOpen={true}
          onClose={closePopup}
          memberData={memberData}
          popupTitle='Manager Details'
        />
      )}

      {openPopup === 'addManager' && (
        <AddMemberPopup
        isOpen={true}
        onClose={closePopup}
        popupTitle="Add New Manager"
      />
      )}


      {openPopup === 'deleteManager' && (
        <DeleteConfirmPopup
        isOpen={true}
        onClose={closePopup}
        onConfirm={handleConfirmDelete} 
        confirmationMessage={confirmationMessage}
        errorMessage={errorMessage}
        question="Do you really want to delete this manager?"
      />
      )}
    </div>
  );
}

export default ManagersPage;
