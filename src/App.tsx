import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ProductList } from './components/Products/ProductList';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
