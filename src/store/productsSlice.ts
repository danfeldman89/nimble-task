import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product.ts";

const PRODUCTS_STORAGE_KEY = "products";

const SORT_ORDER = {
  Ascending: "Ascending",
  Descending: "Descending"
} as const;

const SORT_BY = {
  Price: "Price",
  Created: "Created"
} as const;

type SortingOptions = {
  order: keyof typeof SORT_ORDER;
  by: keyof typeof SORT_BY;
};

const sortingFunctions = {
  priceAscending: (a: Product, b: Product) => a.price - b.price,
  priceDescending: (a: Product, b: Product) => b.price - a.price,
  dateAscending: (a: Product, b: Product) => new Date(a.created).getTime() - new Date(b.created).getTime(),
  dateDescending: (a: Product, b: Product) => new Date(b.created).getTime() - new Date(a.created).getTime()
};

const getSortingFunction = (options: SortingOptions | undefined) => {
  if (typeof options === "undefined") {
    return undefined;
  }

  if (options.by === SORT_BY.Price) {
    return options.order === SORT_ORDER.Ascending
           ? sortingFunctions.priceAscending
           : sortingFunctions.priceDescending;
  }
  if (options.by === SORT_BY.Created) {
    return options.order === SORT_ORDER.Ascending
           ? sortingFunctions.dateAscending
           : sortingFunctions.dateDescending;
  }

  return undefined;
};

export const loadProducts = async (): Promise<Product[]> => {
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
  filter: string;
}

const initialState: InitialState = { productsCollection: [], filter: "" };

const productsSlice = createSlice({
                                    name: "products",
                                    initialState,
                                    reducers: {
                                      updateProducts: (state, action: PayloadAction<Product[]>) => {
                                        state.productsCollection = action.payload;
                                        localStorage.setItem("products", JSON.stringify(state.productsCollection));
                                      },
                                      addProduct: (state, action: PayloadAction<Product>) => {
                                        state.productsCollection.push(action.payload);
                                        localStorage.setItem("products", JSON.stringify(state));
                                      },
                                      deleteProduct: (state, action: PayloadAction<number>) => {
                                        state.productsCollection = state.productsCollection.filter((product) => product.id !== action.payload);
                                        localStorage.setItem("products", JSON.stringify(state.productsCollection));
                                      },
                                      sortProducts: (state, action: PayloadAction<SortingOptions>) => {
                                        const sortFn = getSortingFunction(action.payload);
                                        state.productsCollection = state.productsCollection.sort(sortFn);
                                      },
                                      filterProducts: (state, action: PayloadAction<string>) => {
                                        state.filter = action.payload;
                                      }
                                    }
                                  });

export const { deleteProduct, updateProducts, filterProducts, sortProducts } = productsSlice.actions;
export default productsSlice.reducer;
