import { useState } from 'react';
import { MainStyled } from '..';
import styles from '@styles/Home.module.css';
import ScrollList from 'components/ScrollList';
import BackButton from 'components/BackButton';

const WishList = () => {
  const [wishLists, setWishLists] = useState(() => {
    const rawWishLists = localStorage.getItem('wishLists');
    const localWishLists = rawWishLists ? JSON.parse(rawWishLists) : [];

    return localWishLists.length > 10 ? localWishLists.slice(0, 10) : localWishLists;
  });

  return (
    <div className={styles.container}>
      <BackButton />
      <MainStyled>
        {' '}
        <h1 className="transition text-4xl font-bold mb-8 text-white">Your Planet Wishlist</h1>
        {wishLists.length < 1 ? (
          <div className="mt-16">
            <div className="text-2xl text-white">
              Planet wishlist is looking a bit empty! Add some to your wishlist and check it again!
              🚀🪐✨
            </div>
          </div>
        ) : (
          <ScrollList initialData={wishLists} initialNextUrl={null} clientPagination />
        )}
      </MainStyled>
    </div>
  );
};

export default WishList;
