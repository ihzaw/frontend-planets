import { useState } from 'react';
import { MainStyled } from '..';
import styles from '@styles/Home.module.css';
import ScrollList from 'components/ScrollList';

const WishList = () => {
  const [wishLists, setWishLists] = useState(() => {
    const rawWishLists = localStorage.getItem('wishLists');
    const localWishLists = rawWishLists ? JSON.parse(rawWishLists) : [];

    return localWishLists.length > 10 ? localWishLists.slice(0, 10) : localWishLists;
  });

  return (
    <div className={styles.container}>
      <MainStyled>
        {' '}
        <h1 className="transition text-4xl font-bold mb-8 text-white">Your Planet Wishlist</h1>
        <ScrollList initialData={wishLists} initialNextUrl={null} clientPagination />
      </MainStyled>
    </div>
  );
};

export default WishList;
