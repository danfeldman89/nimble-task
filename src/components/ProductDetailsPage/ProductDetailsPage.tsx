import { useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.less';
import useProductById from "../../hooks/useProductById.ts";

interface ProductDetailsPageProps {

}

function ProductDetailsPage({}: ProductDetailsPageProps) {
  const { productId } = useParams<{ productId: string }>();
  const product = useProductById(Number(productId));

  return (
    <div className={styles.root}>
      {product ? (
        <div className={styles["product-container"]}>
          <img src={product.imageUrl} alt={product.name} className={styles["product-image"]} />
          <div className={styles["product-details"]}>
            <h1 className={styles["product-name"]}>{product.name}</h1>
            <p className={styles["product-description"]}>{product.description}</p>
            <div className={styles["product-meta"]}>
              <span className={styles["product-price"]}>${product.price.toFixed(2)}</span>
              <span className={styles["product-created"]}>
                Added on: {new Date(product.created).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ) : (
         <p className={styles["no-product"]}>Product not found</p>
       )}
    </div>
  );
}

export default ProductDetailsPage;

