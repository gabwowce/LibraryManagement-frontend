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

function MembersPage() {
  const { membersTableColumns, centeredMembersTableColumns } = useTableColumnsContext();
  const { fetchMemberDataById, memberData } = useDataByIdContext();
  const { membersData } = useDataContext();

  const [openPopup, setOpenPopup] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembersData, setFilteredMembersData] = useState(membersData);

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

  const handleAddMemberClick = () => {
    setOpenPopup('addMember');
  };

  const handleDetailsClick = async (memberId) => {
    setSelectedMemberId(memberId);
    setOpenPopup('memberDetails');
    await fetchMemberDataById(memberId);
  };

  const closePopup = () => {
    setOpenPopup(null);
    setSelectedMemberId(null);
  };

  const renderCell = (key, rowData) => {
    if (key === 'loans') {
      return <span className='loansAmount'>{rowData[key].length}</span>;
    } else if (key === 'action') {
      return (
        <div className='btn-deatails-container'>
          <div className='btn-details-group'>
            <BtnPopupDetails
              btnClassName="btn-lend-book"
              btnContent='Lend'
              onButtonClick={() => handleDetailsClick(rowData.id)}
            />
            <BtnPopupDetails
              btnClassName="btn-return-book"
              btnContent='Return'
              onButtonClick={() => handleDetailsClick(rowData.id)}
            />
          </div>
          <BtnPopupDetails
            btnClassName="btn-edit"
            icon={detailsIcon}
            onButtonClick={() => handleDetailsClick(rowData.id)}
          />
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
        tableData={filteredMembersData} // Use filteredMembersData here
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
    </div>
  );
}

export default MembersPage;
