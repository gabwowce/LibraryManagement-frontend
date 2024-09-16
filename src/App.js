import './styles/main.scss';
import MainLayout from '../src/components/MainLayout'
import { BrowserRouter as Router } from 'react-router-dom';
import {DataProvider} from './context/DataContext';
import {ScreenWidthProvider} from './context/ScreenWidthContext'
import { TableColumnsProvider } from './context/TableColumnsContext';


function App() {
  return (
    <DataProvider>
      <ScreenWidthProvider>
        <TableColumnsProvider>
          <Router>
            <MainLayout />
          </Router>
        </TableColumnsProvider>
      </ScreenWidthProvider>
    </DataProvider>
   
  );
}

export default App;
