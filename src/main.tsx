import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from "./store/store.ts";
import { loadProducts, updateProducts } from "./store/productsSlice.ts";

const products = await loadProducts();
store.dispatch(updateProducts(products));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
