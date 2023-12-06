import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainStyled, Planet } from '../index';
import styles from '@styles/Home.module.css';
import { ParsedUrlQuery } from 'querystring';
import SimpleCard from 'components/SimpleCard';
import { ChevronLeft } from 'react-feather';

interface DetailPageProps {
  data: Planet;
}

const Detail: NextPage<DetailPageProps> = (props) => {
  const { data } = props;
  const formattedPopulation = data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        onClick={() => router.back()}
        className="rounded-full transition bg-slate-800 hover:bg-slate-400 p- w-16 h-16 flex justify-center items-center absolute left-10 top-12 text-white"
      >
        <ChevronLeft />
      </button>
      <MainStyled>
        <h1 className="text-white font-semibold text-6xl mb-8">{data.name}</h1>
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-start-3 col-span-2">
            <SimpleCard label="Climate" description={data.climate} />
          </div>
          <div className="col-start-6 col-span-2">
            <SimpleCard label="Terrain" description={data.terrain} />
          </div>
          <div className="col-start-9 col-span-2">
            <SimpleCard label="Diameter" description={`${data.diameter} Km`} />
          </div>
          <div className="col-span-full">
            <div className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 grid grid-cols-12">
              <div className="col-start-2 col-span-2">
                <SimpleCard label="Population" description={`${formattedPopulation} people`} />
              </div>
              <div className="col-span-2">
                <SimpleCard label="Orbital Period" description={`${data.orbital_period} days`} />
              </div>
              <div className="col-span-2">
                <SimpleCard
                  label="Rotational Period"
                  description={`${data.rotation_period} days`}
                />
              </div>
              <div className="col-span-2">
                <SimpleCard label="Gravity" description={`${data.gravity}`} />
              </div>
              <div className="col-span-2">
                <SimpleCard label="Surface Water" description={`${data.surface_water}%`} />
              </div>
            </div>
          </div>
        </div>
      </MainStyled>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const { params } = context;
  if (!params) {
    return {
      props: {
        data: {}
      }
    };
  }
  const itemId = params.itemId as string;
  const API_URL = `https://swapi.dev/api/planets/${itemId}`;
  const response = await fetch(API_URL);
  const planetData = await response.json();

  return {
    props: {
      data: planetData
    }
  };
};

export default Detail;
