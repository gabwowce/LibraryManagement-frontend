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

import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

function MembersPage() {
  const { membersTableColumns, centeredMembersTableColumns} = useTableColumnsContext();
  const { fetchMemberDataById, fetchBookDataById, memberData, deleteMember, confirmationMessage, errorMessage  } = useDataByIdContext();
  const { membersData } = useDataContext();
  const { returnBook } = useUpdateDataContext();

  const [openPopup, setOpenPopup] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembersData, setFilteredMembersData] = useState(membersData);
  const [loansData, setLoansData] = useState([]);

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery.length >= 3) {
        const filteredData = membersData.filter(member =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.surname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMembersData(filteredData);
      } else {
        setFilteredMembersData(membersData);
      }
    };

    handleSearch();
  }, [searchQuery, membersData]);

  const handleConfirmDelete= async()=>{
    await deleteMember(selectedMemberId);
    setSelectedMemberId(null);
  }
  

  const handleAddMemberClick = () => {
    setOpenPopup('addMember');
  };

  const handleLendClick = (memberId) => {
    fetchMemberDataById(memberId);
    setOpenPopup('addLoan');
  };

  const handleReturnClick = async (memberId) => {
    await fetchMemberDataById(memberId);
    setOpenPopup('returnBook');
};


  const handleDetailsClick = async (memberId) => {
    setSelectedMemberId(memberId);
    setOpenPopup('memberDetails');
    await fetchMemberDataById(memberId);
  };

  const handleDeleteClick = (memberId) => {
    setSelectedMemberId(memberId); 
    setOpenPopup('deleteMember'); 
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
          <div className='btn-details-group'>
            <BtnPopupDetails
              btnClassName="btn-lend-book"
              btnContent='Lend'
              onButtonClick={() => handleLendClick(rowData.id)}
            />
            <BtnPopupDetails
              btnClassName="btn-return-book"
              btnContent='Return'
              onButtonClick={() => handleReturnClick(rowData.id)}
            />
          </div>
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
    }
    return rowData[key];
  };

  return (
    <div className='member-page-container'>
      <div className='member-page-header'>
        <h1 className='members-title'>Members</h1>
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        <AddBtn onButtonClick={handleAddMemberClick}
                 content="Add Member"
                 icon={AddMemberIcon} />
      </div>

      <DataTable
        tableColumns={membersTableColumns}
        tableData={filteredMembersData} 
        centeredColumns={centeredMembersTableColumns}
        renderCell={renderCell}
      />

      {openPopup === 'memberDetails' && (
        <MemberDetailsPopup
          isOpen={true}
          onClose={closePopup}
          memberData={memberData}
        />
      )}

      {openPopup === 'addMember' && (
        <AddMemberPopup
          isOpen={true}
          onClose={closePopup}
        />
      )}

      {openPopup === 'addLoan' && (
        <AddNewLoanPopup
          isOpen={true}
          onClose={closePopup}
          memberData={memberData}
        />
      )}

      {openPopup === 'returnBook' && (
        <ReturnBookPopup
          isOpen={true}
          onClose={closePopup}
          memberData={memberData}
          returnBook={returnBook}
        />
      )}

      {openPopup === 'deleteMember' && (
        <DeleteConfirmPopup
        isOpen={true}
        onClose={closePopup}
        onConfirm={handleConfirmDelete} 
        confirmationMessage={confirmationMessage}
        errorMessage={errorMessage}
        question="Do you really want to delete this member?"
      />
      )}
    </div>
  );
}

export default MembersPage;
