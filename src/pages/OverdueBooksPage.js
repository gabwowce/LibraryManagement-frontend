import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';
import OverdueBooksFilter from '../components/OverdueBooksFilter';
import detailsIcon from '../assets/details.png';
import {useDataByIdContext} from '../context/DataByIdContext';
import BtnPopupDetails from '../components/btn/BtnPopupDetails';
import OverdueBookDetailsPopup from '../components/popups/OverdueBookDetailsPopup';

function OverdueBooksPage() {
  const { overdueBooksTableColumns, centeredOverdueBooksTableColumns } = useTableColumnsContext();
  const { overdueBooksData } = useDataContext();
  const { fetchOverdueBookDataById, overdueBookData } = useDataByIdContext();
  
  const [filteredData, setFilteredData] = useState(null);
  const [filters, setFilters] = useState({ startDate: null, order: '' });

  const [openDetailsPopup, setOpenDetailsPopup] = useState(null); 
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  const handleButtonClick = async (loanID) => {
    setSelectedLoanId(loanID); 
    setOpenDetailsPopup(true);     
    await fetchOverdueBookDataById(loanID);
  };

  const closePopup = () => {
    setOpenDetailsPopup(false);
    setSelectedLoanId(null); 
  };

  const applyFilters = (startDate, order) => {
    setFilters({ startDate, order });
  };

  useEffect(() => {
    const applyStartDateFilter = (data) => {
      if (!filters.startDate) return data;
      return data.filter(item => new Date(item.loanStartDate) >= new Date(filters.startDate));
    };

    const applyOrderFilter = (data) => {
      if (!filters.order) return data;
      return data.slice().sort((a, b) => {
        if (filters.order === 'Ascending') {
          return new Date(a.loanStartDate) - new Date(b.loanStartDate);
        } else {
          return new Date(b.loanStartDate) - new Date(a.loanStartDate);
        }
      });
    };

    let updatedData = overdueBooksData;
    updatedData = applyStartDateFilter(updatedData);
    updatedData = applyOrderFilter(updatedData);
    
    setFilteredData(updatedData);

  }, [filters, overdueBooksData]);

  const renderCell = (key, rowData) => {
    if (key === 'daysOverdue') {
        return (
            <span className={`daysOverdue ${rowData[key] > 100 ? 'red-warning' : 'yellow-warning'}`}>
                {rowData[key]}
            </span>
        );
    }else if (key === 'action') {
      return (
              <BtnPopupDetails 
                btnClassName="btn-edit" 
                icon={detailsIcon}
                onButtonClick={() => handleButtonClick(rowData.id)}
            />
      );
    }
    return rowData[key];
};

  return (
    <div>
      <h1>Overdue Books</h1>
      <OverdueBooksFilter onApplyFilters={applyFilters} />
      <DataTable 
                tableColumns={overdueBooksTableColumns} 
                tableData={filteredData || overdueBooksData}  
                centeredColumns={centeredOverdueBooksTableColumns}
                renderCell={renderCell}/>

      <OverdueBookDetailsPopup 
            isOpen={openDetailsPopup}
            onClose={closePopup}
            overudeBookData={overdueBookData}
            />
    </div>
  );
}

export default OverdueBooksPage;
