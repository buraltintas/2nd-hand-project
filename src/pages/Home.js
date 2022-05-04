import React, { Suspense } from 'react';
import Header from '../components/header';
import Banner from '../components/banner';
import Categories from '../components/categories';
import LoadingSpinner from '../components/loading/LoadingSpinner';
// import Products from '../components/products';

const Home = () => {
  const ProductsContainer = React.lazy(() => import('../components/products'));

  return (
    <>
      <Header />
      <Banner />
      <Categories />
      <Suspense fallback={<LoadingSpinner />}>
        <ProductsContainer />
      </Suspense>
    </>
  );
};

export default Home;
