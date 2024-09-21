import React, { useState, useEffect } from 'react';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';
import { useDataByIdContext } from '../context/DataByIdContext';
import DataTable from '../components/DataTable';
import AddMemberBtn from '../components/btn/AddMemberBtn';
import AddBookPopup from '../components/popups/AddBookPopup';
import detailsIcon from '../assets/details.png';
import BooksFilter from '../components/BooksFilter';

function BooksPage() {
  const { booksTableColumns, centeredBooksTableColumns } = useTableColumnsContext();
  const { booksData } = useDataContext();
  const { fetchBookDataById, bookData } = useDataByIdContext();
  
  const [openDetailsPopup, setOpenDetailsPopup] = useState(null); 
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [filteredData, setFilteredData] = useState(booksData); // Initialize with all books data

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
          {rowData[key] > 0 ? `${rowData[key]} left` : 'Fully Loaned'}
        </span>
      );
    } else if (key === 'imagePath') {
      return (
        <img className="book-image" src={rowData[key]} alt="Book" style={{ width: '50px', height: 'auto' }} />
      );
    // } else if (key === 'action') {
    //   return (
    //     <BtnPopupDetails 
    //       btnClassName="btn-edit" 
    //       icon={detailsIcon}
    //       onButtonClick={() => handleButtonClick(rowData.id)}
    //     />
    //   );
    }
    return rowData[key];
  };


  const handleApplyFilters = (selectedYear, selectedCategory) => {
    let filtered = booksData;

    if (selectedYear) {
      filtered = filtered.filter(book => book.yearOfRelease === selectedYear);
    }

    if (selectedCategory) {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(booksData); 
  }, [booksData]);

  return (
    <div>
      <h1>Books</h1>
      <div className='actions-container'>
        <BooksFilter onApplyFilters={handleApplyFilters} />
        <AddMemberBtn onButtonClick={handleButtonClick}/>
      </div>
      <DataTable 
        tableColumns={booksTableColumns} 
        tableData={filteredData}  
        centeredColumns={centeredBooksTableColumns}
        renderCell={renderCell}
      />

      <AddBookPopup 
        isOpen={openDetailsPopup}
        onClose={closePopup}
      />
    </div>
  );
}

export default BooksPage;
