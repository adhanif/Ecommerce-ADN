import React from 'react';
import { useGetAllCategoriesQuery } from '../../redux/categoryQuery';
import Loading from '../loading/Loading';

const AdminCategoriesTable = () => {
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();

  console.log(allCategories);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return <div>AdminCategoriesTable</div>;
};

export default AdminCategoriesTable;
