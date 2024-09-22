import './styles/main.scss';
import MainLayout from '../src/components/MainLayout'
import { BrowserRouter as Router } from 'react-router-dom';
import {DataProvider} from './context/DataContext';
import {ScreenWidthProvider} from './context/ScreenWidthContext'
import { TableColumnsProvider } from './context/TableColumnsContext';
import { DataByIdProvider } from './context/DataByIdContext';
import { UpdateDataProvider } from './context/UpdateDataContext';
import { AddDataProvider } from './context/AddDataContext';


function App() {
  return (
    <ScreenWidthProvider>
      <AddDataProvider>
        <DataByIdProvider>
          <UpdateDataProvider>
            <DataProvider>
              
                  
                <TableColumnsProvider>
                  <Router>
                    <MainLayout />
                  </Router>
                </TableColumnsProvider>
                    
                
              
            </DataProvider>
          </UpdateDataProvider>
        </DataByIdProvider>
      
      </AddDataProvider>
     
      
    </ScreenWidthProvider>
    
   
  );
}

export default App;
