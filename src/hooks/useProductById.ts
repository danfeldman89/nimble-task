import { useSelector } from "react-redux";
import { Product } from "../types/product.ts";
import { RootState } from "../store/store.ts";

export default function useProductById(id: number): Product | undefined {
  const product = useSelector((state: RootState) =>
                                state.products.productsCollection.find((product) => product.id === id)
  );
  return product;
}
