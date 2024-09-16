import React from 'react';
import DataTable from '../components/DataTable';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';

function OverdueBooksPage() {
  const {overdueBooksTableColumns} = useTableColumnsContext();
  const {overdueBooksData} = useDataContext();
  console.log('----------->overdueBooksData:', overdueBooksData);

  return (
    <div>
      <h1>Overdue Books</h1>
      
      {/* <OverdueBooksFilter/> */}

      <DataTable tableColumns={overdueBooksTableColumns} tableData={overdueBooksData}/>
    </div>
  );
}

export default OverdueBooksPage;