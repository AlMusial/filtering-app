import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ProductList from './components/Products/ProductList';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    </div>
  );
}

export default App;
