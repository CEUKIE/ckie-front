import styled from '@emotion/native';
import React from 'react';

import SafeAreaView from '../components/common/SafeAreaView';
import Chart from '../components/Chart';

const Container = styled.View`
  margin-top: 24px;
`;

const data: number[] = [
  24.5, 25.2, 27.4, 22.6, 25.7, 26, 27, 22, 25, 26, 22, 23, 25,
];

const CageTemperatureScreen = () => {
  // TODO individualId로 데이터 검색 후 사용
  // const individualId = useIndividualIdStore(({id}) => id);

  return (
    <SafeAreaView>
      <Container>
        <Chart
          records={data}
          labels={new Array(13).fill(0).map((v, i) => String(i * 2))}
          yAxisSuffix={'°C'}
        />
      </Container>
    </SafeAreaView>
  );
};

export default CageTemperatureScreen;
