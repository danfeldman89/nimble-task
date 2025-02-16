import styles from './productList.module.less';
import { useSelector } from "react-redux";
import { ProductDisplay } from "../ProductDisplay/ProductDisplay.tsx";
import { RootState } from "../../store/store.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import Toolbar from "../Toolbar/Toolbar.tsx";
import { useEffect, useState } from "react";

const productsPerPage = 5;

function ProductList() {
  const products = useSelector((state: RootState) => state.products.productsCollection);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [page, setPage] = usePagination(filteredProducts, productsPerPage);
  const textFilter = useSelector((state: RootState) => state.products.filter);

  useEffect(() => {
    setFilteredProducts(products.filter(product =>
                                          product.name.toLowerCase().includes(textFilter) ||
                                          product.description.toLowerCase().includes(textFilter)));
  }, [products, textFilter]);

  return (
    <>
      <Toolbar />
      <div className={styles.root}>
        <div className={styles["product-list-container"]}>
          <div className={styles.list}>
            {filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage)
                             .map((product) => (<ProductDisplay key={product.id}
                                                                product={product} />))}

          </div>
        </div>

        <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)}>Previous</button>
          <div>{page}</div>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </>);
}

export default ProductList;
