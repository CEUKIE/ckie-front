import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import theme from '../styles/theme';
import Svg, {Text as SVGText} from 'react-native-svg';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';

export interface WeightChartProps {
  weightRecords: WeightRecord[];
  weightUnit: 'g' | 'kg';
}

export interface WeightRecord {
  targetDate: Date;
  weight: number;
}

const WeightChart = ({weightRecords, weightUnit}: WeightChartProps) => {
  const [data, setData] = useState<LineChartData>({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    console.log(`차트 컴포넌트: ${weightRecords}`);
    const records: number[] = [];
    weightRecords.forEach(record => records.push(record.weight));
    setData({
      ...data,
      datasets: [
        {
          data: [...records],
        },
        // y축 최댓값이 record의 최댓값보다 크게 하기 위한 투명한 점.
        {
          data: [Math.max(...records) + 2],
          color: () => 'transparent',
          strokeWidth: 0,
          withDots: false,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightRecords]);

  return (
    <View>
      {data.datasets[0].data.length !== 0 && (
        <LineChart
          data={data}
          width={Dimensions.get('window').width} // from react-native
          height={260}
          withVerticalLines={false}
          fromZero
          yAxisSuffix={weightUnit}
          yAxisInterval={1} // optional, defaults to 1
          withVerticalLabels={false}
          onDataPointClick={({value}) => Alert.alert(value.toString())}
          chartConfig={{
            backgroundGradientFrom: theme.color.white,
            backgroundGradientTo: theme.color.white,
            fillShadowGradientFrom: theme.color.secondary,
            fillShadowGradientTo: theme.color.secondary,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: () => theme.color.secondary,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: theme.color.white,
            },
          }}
          bezier
          renderDotContent={({x, y, index, indexData}) => (
            <Svg key={index} style={{position: 'absolute', top: 0, left: 0}}>
              <SVGText
                x={x}
                y={y - 11}
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle">
                {indexData}
              </SVGText>
            </Svg>
          )}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default WeightChart;
