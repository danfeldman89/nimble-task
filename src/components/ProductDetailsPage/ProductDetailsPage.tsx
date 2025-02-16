import { useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.less';
import useProductById from "../../hooks/useProductById.ts";

interface ProductDetailsPageProps {

}

function ProductDetailsPage({}: ProductDetailsPageProps) {
  const { productId } = useParams<{ productId: string }>();
  const product = useProductById(Number(productId))

  return (
    <div className={styles.root}>
      <div>
        {product?.name}
      </div>
      <p>Product ID: {productId}</p>
    </div>
  );
}

export default ProductDetailsPage;
