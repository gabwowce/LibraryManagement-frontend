import './styles/main.scss';
import MainLayout from '../src/components/MainLayout'
import { BrowserRouter as Router } from 'react-router-dom';
import {DataProvider} from './context/DataContext';
import {ScreenWidthProvider} from './context/ScreenWidthContext'
import { TableColumnsProvider } from './context/TableColumnsContext';
import { DataByIdProvider } from './context/DataByIdContext';
import { UpdateDataProvider } from './context/UpdateDataContext';
import { AddDataProvider } from './context/AddDataContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (

    <Router>
      <AuthProvider>

        <ScreenWidthProvider>
              <AddDataProvider>
                <DataByIdProvider>
                  <UpdateDataProvider>
                    <DataProvider>
                      
                          
                        <TableColumnsProvider>
                        
                            <MainLayout />
                        
                        </TableColumnsProvider>
                            
                        
                      
                    </DataProvider>
                  </UpdateDataProvider>
                </DataByIdProvider>
              
              </AddDataProvider>
            
              
            </ScreenWidthProvider>
        </AuthProvider>
    </Router>
    
   
  );
}

export default App;
