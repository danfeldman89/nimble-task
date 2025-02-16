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
      <div className={styles["image-url"]}>
        {product.imageUrl}
      </div>
      <div className={styles["product-info"]}>
        <div>
          {product.name}
        </div>
        <div>
          {product.description}
        </div>
        {/*<div className="created">*/}
        {/*  {product.created.getDate()}*/}
        {/*</div>*/}
        <div className="price">
          {product.price}
        </div>

      </div>
    </div>
  );
}
