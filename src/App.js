import './styles/main.scss';
import MainLayout from '../src/components/MainLayout'
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
