import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneProductMutation } from '../../redux/productsQuery';

export default function ProductDetail() {
  const productId = useParams();
  const [getOneProduct, { data, error, isLoading }] =
    useGetOneProductMutation();

  console.log(data);
  useEffect(() => {
    getOneProduct(Number(productId.id));
  }, []);

  return <div>ProductPage</div>;
}
