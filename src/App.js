import './styles/main.scss';
import MainLayout from '../src/components/MainLayout'
import { BrowserRouter as Router } from 'react-router-dom';
import {DataProvider} from './context/DataContext';
import {ScreenWidthProvider} from './context/ScreenWidthContext'


function App() {
  return (
    <DataProvider>
      <ScreenWidthProvider>
        <Router>
          <MainLayout />
        </Router>
      </ScreenWidthProvider>
    </DataProvider>
   
  );
}

export default App;
