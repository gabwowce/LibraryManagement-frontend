import React, { useState } from 'react';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';
import DataTable from '../components/DataTable';
import MemberDetailsPopup from '../components/popups/MemberDetailsPopup';
import BtnPopupDetails from '../components/btn/BtnPopupDetails';
import {useDataByIdContext} from '../context/DataByIdContext';
import detailsIcon from '../assets/details.png';
import SearchBar from '../components/SearchBar';

function MembersPage() {
  const { membersTableColumns, centeredMembersTableColumns} = useTableColumnsContext();
  const { fetchMemberDataById, memberData } = useDataByIdContext();
  const {membersData} = useDataContext();

  const [openDetailsPopup, setOpenDetailsPopup] = useState(null); 
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const handleButtonClick = async (memberId) => {
    setSelectedMemberId(memberId); 
    setOpenDetailsPopup(true);    
    await fetchMemberDataById(memberId);
  };

  const closePopup = () => {
    setOpenDetailsPopup(false);
    setSelectedMemberId(null); 
  };

  const renderCell = (key, rowData) => {
    if (key === 'loans') {
      return (
        <span className='loansAmount'>
          {rowData[key].length}
        </span>
      );
    } else if (key === 'action') {
      return (
        <div className='btn-deatails-container'>
          <div className='btn-details-group'>
            <BtnPopupDetails 
                  btnClassName="btn-lend-book" 
                  btnContent='Lend'
                  onButtonClick={() => handleButtonClick(rowData.id)}
              />
            <BtnPopupDetails 
                  btnClassName="btn-return-book" 
                  btnContent='Return'
                  onButtonClick={() => handleButtonClick(rowData.id)}
            />
          </div>
          
          <BtnPopupDetails 
                btnClassName="btn-edit" 
                icon={detailsIcon}
                onButtonClick={() => handleButtonClick(rowData.id)}
            />
        </div> 
      );
    }
    return rowData[key];
  };


  return (
      <div className='member-page-container'>
        <div className='member-page-header'>
          <h1>Members</h1>
          <SearchBar/>
        </div>
        
        <DataTable 
              tableColumns={membersTableColumns} 
              tableData={membersData}  
              centeredColumns={centeredMembersTableColumns}
              renderCell={renderCell}/>

        <MemberDetailsPopup 
            isOpen={openDetailsPopup}
            onClose={closePopup}
            memberData={memberData}/>
      </div>
    
  );
}

export default MembersPage;