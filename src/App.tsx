import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import ProductList from "./components/productList/ProductList.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
