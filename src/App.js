import './styles/main.scss';
import MainLayout from '../src/components/MainLayout'
import { BrowserRouter as Router } from 'react-router-dom';
import {DataProvider} from './context/DataContext';
import {ScreenWidthProvider} from './context/ScreenWidthContext'
import { TableColumnsProvider } from './context/TableColumnsContext';
import { DataByIdProvider } from './context/DataByIdContext';


function App() {
  return (
    <ScreenWidthProvider>
      <DataProvider>
            <DataByIdProvider>
            
                <TableColumnsProvider>
                  <Router>
                    <MainLayout />
                  </Router>
                </TableColumnsProvider>
            
            </DataByIdProvider>
      </DataProvider>
    </ScreenWidthProvider>
    
   
  );
}

export default App;
