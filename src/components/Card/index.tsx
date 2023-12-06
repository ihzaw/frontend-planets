import { Planet } from '@pages/index';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Cloud, Globe, User } from 'react-feather';

interface CardPropTypes {
  data: Planet;
}

const Card: NextPage<CardPropTypes> = ({ data }) => {
  const [itemId, setItemId] = useState<string>('');

  useEffect(() => {
    if (data.url) {
      const newItemId = data.url.split('/')[5];
      setItemId(newItemId);
    }
  }, [data]);

  const formattedPopulation = data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Link href={`/detail/${itemId}`} passHref>
      <div className="cursor-pointer h-96 p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 hover:bg-opacity-80 transition border border-gray-100 text-white ">
        <p className="text-xl font-semibold underline mb-8">{data.name}</p>
        <div className="space-y-4">
          <div className="flex items-center">
            <Cloud />
            <div className="ml-4">{data.climate}</div>
          </div>
          <div className="flex">
            <Globe />
            <div className="ml-4">{data.terrain}</div>
          </div>
          <div className="flex">
            <User />
            <div className="ml-4">{formattedPopulation}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
