import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage.tsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
