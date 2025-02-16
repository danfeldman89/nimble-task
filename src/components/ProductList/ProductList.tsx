import styles from './productList.module.less';
import { useSelector } from "react-redux";
import { ProductDisplay } from "../ProductDisplay/ProductDisplay.tsx";
import { RootState } from "../../store/store.ts";
import { usePagination } from "../../hooks/usePagination.ts";

const productsPerPage = 5;

function ProductList() {
  const products = useSelector((state: RootState) => state.products.productsCollection);
  const [page, setPage] = usePagination(products, productsPerPage);

  return (
    <div className={styles.root}>
      <div className={styles["product-list-container"]}>
        <div className={styles.list}>
          {products.slice((page - 1) * productsPerPage, page * productsPerPage)
                   .map((product) => (<ProductDisplay key={product.id}
                                                      product={product} />))}

        </div>
      </div>

      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <div>{page}</div>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>);
}

export default ProductList;
