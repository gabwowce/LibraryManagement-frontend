import React, { useState } from 'react';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';
import {useDataByIdContext} from '../context/DataByIdContext';
import DataTable from '../components/DataTable';
import BtnPopupDetails from '../components/btn/BtnPopupDetails'
import BookDetailsPopup from '../components/popups/BookDetailsPopup';
import detailsIcon from '../assets/details.png';
import BooksFilter from '../components/BooksFilter';

function BooksPage() {
  const { booksTableColumns, centeredBooksTableColumns } = useTableColumnsContext();
  const { booksData } = useDataContext();
  const { fetchBookDataById, bookData } = useDataByIdContext();
  
  const [openDetailsPopup, setOpenDetailsPopup] = useState(null); 
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleButtonClick = async (bookID) => {
    setSelectedBookId(bookID); 
    setOpenDetailsPopup(true);     
    await fetchBookDataById(bookID);
  };

  const closePopup = () => {
    setOpenDetailsPopup(false);
    setSelectedBookId(null); 
  };

  const renderCell = (key, rowData) => {
    if (key === 'remainingFree') {
      return (
        <span className={`remainingFree ${rowData[key] > 0 ? 'green-frame' : 'red-frame'}`}>
          {rowData[key] > 0 ? `${rowData[key] + ' left'}` : 'Fully Loaned'}
        </span>
      );
    } else if (key === 'imagePath') {
      return (
        <img className="book-image" src={rowData[key]} alt="Book" style={{ width: '50px', height: 'auto' }} />
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
      <h1>Books</h1>
      <BooksFilter/>
      <DataTable 
                tableColumns={booksTableColumns} 
                tableData={booksData}  
                centeredColumns={centeredBooksTableColumns}
                renderCell={renderCell}/>

      <BookDetailsPopup 
            isOpen={openDetailsPopup}
            onClose={closePopup}
            memberData={bookData}
            />
    </div>
  );
}

export default BooksPage;