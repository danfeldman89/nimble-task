import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product.ts";
import store from "./store.ts";

const PRODUCTS_STORAGE_KEY = "products";

const loadProducts = async (): Promise<Product[]> => {
  try {
    const storedData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    const parsedProducts: Product[] = storedData
                                      ? JSON.parse(storedData)
                                      : await import('../data/productData1.json').then(module => module.default);
    Product.currentId = Math.max(...parsedProducts.map(product => product.id));
    return parsedProducts;
  } catch (error) {
    console.error("Error loading products from localStorage", error);
    const products: Product[] = await import('../data/productData1.json')
      .then(module => module.default as Product[]);
    Product.currentId = Math.max(...products.map(product => product.id));
    return products;
  }
};

interface InitialState {
  productsCollection: Product[];
}

const initialState: InitialState = { productsCollection: [] };

loadProducts().then((products) => {
  store.dispatch(updateProducts(products));
});

const productsSlice = createSlice({
                                    name: "products",
                                    initialState,
                                    reducers: {
                                      updateProducts: (state, action: PayloadAction<Product[]>) => {
                                        state.productsCollection = action.payload
                                        localStorage.setItem("products", JSON.stringify(state.productsCollection));
                                      },
                                      addProduct: (state, action: PayloadAction<Product>) => {
                                        state.productsCollection.push(action.payload);
                                        localStorage.setItem("products", JSON.stringify(state));
                                      },
                                      deleteProduct: (state, action: PayloadAction<number>) => {
                                        state.productsCollection = state.productsCollection.filter((product) => product.id !== action.payload);
                                        localStorage.setItem("products", JSON.stringify(state.productsCollection));
                                      }
                                    }
                                  });

export const { addProduct, deleteProduct, updateProducts } = productsSlice.actions;
export default productsSlice.reducer;
