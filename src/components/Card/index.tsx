import { Planet } from '@pages/index';

import { NextPage } from 'next';

interface CardPropTypes {
  data: Planet;
}

const Card: NextPage<CardPropTypes> = ({ data }) => {
  return (
    <div className="cursor-pointer h-96 p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 hover:bg-opacity-80 transition border border-gray-100 text-white ">
      <p className="text-xl font-semibold underline">{data.name}</p>
      <p>{data.climate}</p>
      <p>{data.terrain}</p>
      <p>{data.population}</p>
    </div>
  );
};

export default Card;
