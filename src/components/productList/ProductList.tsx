import styles from './productList.module.less';
import { useSelector } from "react-redux";
import { useState } from "react";
import { ProductDisplay } from "../ProductDisplay/ProductDisplay.tsx";
import { RootState } from "../../store/store.ts";

function ProductList() {
  const products = useSelector((state: RootState) => state.products.productsCollection);
  const [page, setPage] = useState(1);

  return (
    <div className={styles.root}>
      {products.map((product) => <ProductDisplay product={product} />)}
    </div>
  );
}

export default ProductList;
