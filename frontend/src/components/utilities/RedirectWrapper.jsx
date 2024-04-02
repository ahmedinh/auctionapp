import { useParams, Navigate } from 'react-router-dom';

export const RedirectWrapper = () => {
  const { productId } = useParams();
  return <Navigate to={`/shop/product/${productId}/details`} replace />;
};
