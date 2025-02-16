import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from "./store/store.ts";
import { loadProducts, updateProducts } from "./store/productsSlice.ts";

const products = await loadProducts(); // Load products from localStorage or JSON
store.dispatch(updateProducts(products)); // Update the Redux store

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
