import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainStyled, Planet } from '../index';
import styles from '@styles/Home.module.css';
import { ParsedUrlQuery } from 'querystring';
import SimpleCard from 'components/SimpleCard';

interface DetailPageProps {
  data: Planet;
}

const Detail: NextPage<DetailPageProps> = (props) => {
  const { data } = props;

  return (
    <div className={styles.container}>
      <MainStyled>
        <h1 className="text-white font-semibold text-4xl mb-8">{data.name}</h1>
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
