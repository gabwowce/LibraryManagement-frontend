import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';
import OverdueBooksFilter from '../components/OverdueBooksFilter';

function OverdueBooksPage() {
  const { overdueBooksTableColumns, centeredOverdueBooksTableColumns } = useTableColumnsContext();
  const { overdueBooksData } = useDataContext();
  
  const [filteredData, setFilteredData] = useState(null);
  const [filters, setFilters] = useState({ startDate: null, order: '' });

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
    </div>
  );
}

export default OverdueBooksPage;
