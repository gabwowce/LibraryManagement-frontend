import React, { useState, useEffect } from 'react';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import { useDataContext } from '../context/DataContext';
import { useDataByIdContext } from '../context/DataByIdContext';
import DataTable from '../components/DataTable';
import AddBtn from '../components/btn/AddBtn';
import BooksFilter from '../components/BooksFilter';
import BtnPopupDetails from "../components/btn/BtnPopupDetails";
import BookDetailsPopup from '../components/popups/BookDetailsPopup';
import DeleteConfirmPopup from '../components/popups/DeleteConfirmPopup';
import AddBookPopup from '../components/popups/AddBookPopup';
import AddbookIcon from '../assets/addBook.png';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import { useAuthContext } from '../context/AuthContext';

function BooksPage() {
  const { booksTableColumns, centeredBooksTableColumns } = useTableColumnsContext();
  const { booksData } = useDataContext(); 
  const { fetchBookDataById, bookData } = useDataByIdContext();

  const [openAddBookPopup, setOpenAddBookPopup] = useState(false);
  const [openDetailsPopup, setOpenDetailsPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false); 
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [filteredData, setFilteredData] = useState(booksData);

  const {user} = useAuthContext();

  const { deleteBook, errorMessage, confirmationMessage} = useDataByIdContext();

  const handleAddBookButtonClick = () => {
    setOpenAddBookPopup(true);
  };

  const handleDetailsButtonClick = async (bookID) => {
    setSelectedBookId(bookID);
    setOpenDetailsPopup(true);
    await fetchBookDataById(bookID);
  };

  const handleDeleteClick = (bookID) => {
    setSelectedBookId(bookID);
    setOpenDeletePopup(true); 
  };

  const handleConfirmDelete = async () => {
    await deleteBook(selectedBookId);
    
  };

  const closePopup = () => {
    setOpenDetailsPopup(false);
    setOpenDeletePopup(false); 
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
    } else if (key === 'action') {
      return (
        <div className='edit-delete-container'>
          <BtnPopupDetails 
            btnClassName="btn-edit" 
            icon={editIcon}
            onButtonClick={() => handleDetailsButtonClick(rowData.id)}
          />
          <BtnPopupDetails 
            btnClassName="btn-delete" 
            icon={deleteIcon}
            onButtonClick={() => handleDeleteClick(rowData.id)} 
          />
        </div>
      );
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
        {user.role === 'admin' && (
           <AddBtn onButtonClick={handleAddBookButtonClick} content="Add Book" icon={AddbookIcon} />
        )}
      </div>
      <DataTable 
        tableColumns={booksTableColumns} 
        tableData={filteredData}  
        centeredColumns={centeredBooksTableColumns}
        renderCell={renderCell}
      />

      <AddBookPopup 
        isOpen={openAddBookPopup}
        onClose={() => setOpenAddBookPopup(false)}
      />

      <BookDetailsPopup
        isOpen={openDetailsPopup}
        onClose={closePopup}
        bookData={bookData}
      />

      {openDeletePopup && (
        <DeleteConfirmPopup
          isOpen={true}
          onClose={closePopup}
          confirmationMessage={confirmationMessage}
          errorMessage={errorMessage}
          onConfirm={handleConfirmDelete}
          question="Do you really want to delete this book?"
        />
      )}
    </div>
  );
}

export default BooksPage;
