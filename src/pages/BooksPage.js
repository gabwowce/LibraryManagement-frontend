import React from 'react';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';
import DataTable from '../components/DataTable';

function BooksPage() {
  const { booksTableColumns, centeredBooksTableColumns } = useTableColumnsContext();
  const { booksData } = useDataContext();

  const renderCell = (key, rowData) => {
    if (key === 'remainingFree') {
      return (
        <span className={`remainingFree ${rowData[key] > 0 ? 'green-frame' : 'red-frame'}`}>
          {rowData[key] > 0 ? `${rowData[key] + ' left'}` : 'Fully Loaned'}
        </span>
      );
    } else if (key === 'imagePath') {
      return (
        <img src={rowData[key]} alt="Book" style={{ width: '50px', height: 'auto' }} />
      );
    }
    return rowData[key];
  };

  return (
    <div>
      <h1>Books Page</h1>
      <DataTable 
                tableColumns={booksTableColumns} 
                tableData={booksData}  
                centeredColumns={centeredBooksTableColumns}
                renderCell={renderCell}/>
    </div>



  );
}

export default BooksPage;