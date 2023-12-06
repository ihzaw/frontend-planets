import { Planet } from '@pages/index';
import Card from 'components/Card';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  width: 100%;
`;

interface ScrollListProps {
  initialData: Array<Planet>;
}

const ScrollList: NextPage<ScrollListProps> = (props) => {
  const { initialData } = props;

  const [renderedData, setRenderedData] = useState<Array<Planet>>([]);

  useEffect(() => {
    setRenderedData(initialData);
  }, [initialData]);

  return (
    <GridContainer>
      {renderedData?.map((data) => {
        return <Card key={`${data.name}`} data={data} />;
      })}
    </GridContainer>
  );
};

export default ScrollList;
