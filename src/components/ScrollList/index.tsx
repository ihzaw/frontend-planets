import { Planet, PlanetList } from '@pages/index';
import Card from 'components/Card';
import { NextPage } from 'next';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Loader } from 'react-feather';

import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  width: 100%;
`;

interface ScrollListProps {
  initialData: Array<Planet>;
  initialNextUrl: string | null;
  clientPagination?: boolean;
}

const ScrollList: NextPage<ScrollListProps> = (props) => {
  const { initialData, initialNextUrl, clientPagination } = props;

  const [renderedData, setRenderedData] = useState<Array<Planet>>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextUrl, setNextUrl] = useState<string | null>(initialNextUrl);
  const [error, setError] = useState<string>('');
  const loadingRef = useRef(null);

  const loadMoreData = useCallback(async () => {
    try {
      setError('');
      if (!nextUrl) {
        return;
      }
      const response = await fetch(nextUrl);
      const newData: PlanetList = await response.json();

      if (!newData.next) {
        setHasMore(false);
        return;
      }

      setNextUrl(newData.next);
      setRenderedData((previousState) => {
        return [...previousState, ...newData.results];
      });
    } catch (error) {
      console.error('Error fetching more data:', error);
      setError('error');
    }
  }, [nextUrl]);

  const loadClientData = useCallback(async () => {
    try {
      const rawWishLists = localStorage.getItem('wishLists');
      const parsedData = rawWishLists ? JSON.parse(rawWishLists) : [];

      const currentLength = renderedData.length;

      if (currentLength < parsedData.length) {
        const difference = parsedData.length - currentLength;
        let newItems = [];
        if (difference > 0 && difference <= 10) {
          newItems = parsedData.slice(currentLength, currentLength + difference);
        }
        if (difference > 10) {
          newItems = parsedData.slice(currentLength, currentLength + 10);
        }
        const newRenderedData = [...renderedData, ...newItems];
        setRenderedData(newRenderedData);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
      setError('error');
    }
  }, [renderedData]);

  const handleIntersection = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore) {
        if (clientPagination) {
          await loadClientData();
          return;
        }
        await loadMoreData();
      }
    },
    [loadMoreData, hasMore, clientPagination, loadClientData]
  );

  useEffect(() => {
    setRenderedData(initialData);
  }, [initialData]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    const currentLoadingRef: HTMLDivElement | null = loadingRef.current;

    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef);
      }
    };
  }, [hasMore, nextUrl, handleIntersection]);

  return (
    <div>
      {error && (
        <div className="text-white fixed z-50 bg-red-500 p-2 rounded bottom-10 right-10">
          Something went wrong, please refresh the page
        </div>
      )}

      <GridContainer>
        {renderedData?.map((data, index) => {
          return <Card key={`${data.name}-${index}`} data={data} />;
        })}
      </GridContainer>
      <div ref={loadingRef} className="flex mt-4 justify-center">
        {hasMore && <Loader className="animate-spin text-white" size={40} />}
      </div>
    </div>
  );
};

export default ScrollList;
