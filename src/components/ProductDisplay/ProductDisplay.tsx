import styles from './productDisplay.module.less';
import { Product } from "../../types/product.ts";
import { useNavigate } from "react-router-dom";

interface ProductDisplayProps {
  product: Product;
}

export function ProductDisplay({ product }: ProductDisplayProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/product/${product.id}`);
  }

  return (
    <div className={styles.root} onClick={handleClick}>
      <img src={product.imageUrl} alt={product.name} className={styles["image-url"]}></img>
      <div className={styles["product-info"]}>
        <div>
          {product.name}
        </div>
        <div>
          {product.description}
        </div>
        <div className="created">
          {new Date(product.created).toLocaleDateString()}
        </div>
        <div className="price">
          {product.price}
        </div>
      </div>

      <div className={styles["delete-button"]}>
        <button onClick={(e) => {
          e.stopPropagation();
          // dispatch(deleteProduct(product.id));
        }}>
          Delete
        </button>
      </div>
    </div>
  );
}
