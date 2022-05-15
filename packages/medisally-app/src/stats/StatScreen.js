import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import useSWR from 'swr'
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import Header from '../common/Header.js'
import GradientBackground from '../common/GradientBackground.js'
import { LineChart } from "react-native-chart-kit";
import Calendar from '../home/Calendar.js'
import Card from '../common/Card.js'

import {ChartDot, ChartPath, ChartPathProvider, monotoneCubicInterpolation, ChartXLabel, ChartYLabel} from '@rainbow-me/animated-charts';
export const {width: SIZE} = Dimensions.get('window');
const data = [
  {x: 1453075200, y: 1.47}, {x: 1453161600, y: 1.37},
  {x: 1453248000, y: 1.53}, {x: 1453334400, y: 1.54},
  {x: 1453420800, y: 1.52}, {x: 1453507200, y: 2.03},
  {x: 1453593600, y: 2.10}, {x: 1453680000, y: 2.50},
  {x: 1453766400, y: 2.30}, {x: 1453852800, y: 2.42},
  {x: 1453939200, y: 2.55}, {x: 1454025600, y: 2.41},
  {x: 1454112000, y: 2.43}, {x: 1454198400, y: 2.20},
];
const points = monotoneCubicInterpolation({data, range: 40});

const screenWidth = Dimensions.get("window").width;

import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'



const StatScreen = ({ route, navigation }) => {
  const { colors } = useTheme()
  // const { data, error } = useSWR('/test')

  const [showHeaderBorder, setShowHeaderBorder] = React.useState(false)
  const scrollViewRef = React.useRef(null)

  return (
    <>
       <Header showHeaderBorder={showHeaderBorder}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 25}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} color={colors.primary} style={{marginRight: 15}}/>
          </TouchableOpacity>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.text, marginRight: 'auto'}}>증상 {route.params.symptomId}</Text>
          <Ionicons name="add-circle" size={35} color={colors.primary} style={{
            shadowColor: "rgba(0,0,0,0.25)",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}/>
        </View>
      </Header>

      <ScrollView 
        ref={scrollViewRef} 
        style={{flex: 1}} 
        contentContainerStyle={{padding : 7.5, paddingBottom: 30}}
        onScroll={(e) => {
          const scrollY = e.nativeEvent.contentOffset.y
          if (scrollY >= 10 && !showHeaderBorder) {
            setShowHeaderBorder(true)
          } else if (scrollY < 10 && showHeaderBorder) {
            setShowHeaderBorder(false)
          }
        }}
        scrollEventThrottle={16}
      >
        <GradientBackground/>

        <Calendar style={{margin: 7.5}}/>

        <Card>
          <TestLineChart/>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: -7.5, marginTop: 15}}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 30, backgroundColor: 'transparent', margin: 7.5, borderRadius: 7.5}}>
              <Text style={{fontSize: 15, fontWeight: '700', color: colors.primary}}>일</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 30, backgroundColor: hexToRgba(colors.primary)(0.2), margin: 7.5, borderRadius: 7.5}}>
              <Text style={{fontSize: 15, fontWeight: '700', color: colors.primary}}>주</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 30, backgroundColor: 'transparent', margin: 7.5, borderRadius: 7.5}}>
              <Text style={{fontSize: 15, fontWeight: '700', color: colors.primary}}>월</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 30, backgroundColor: 'transparent', margin: 7.5, borderRadius: 7.5}}>
              <Text style={{fontSize: 15, fontWeight: '700', color: colors.primary}}>년</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card>
          <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
            <ChartPath gestureEnabled={false} height={200} stroke={colors.primary} width={SIZE-60} strokeWidth={5} />
            {/* <ChartDot style={{ backgroundColor: 'blue' }} /> */}
          </ChartPathProvider>
        </Card>

        <Card>
          <Chart
            style={{ height: 200, width: screenWidth-60 }}
            data={[
              { x: -2, y: 15 },
              { x: -1, y: 10 },
              { x: 0, y: 12 },
              { x: 1, y: 7 },
              { x: 2, y: 6 },
              { x: 3, y: 8 },
              { x: 4, y: 10 },
              { x: 5, y: 8 },
              { x: 6, y: 12 },
              { x: 7, y: 14 },
              { x: 8, y: 12 },
              { x: 9, y: 13.5 },
              { x: 10, y: 18 },
            ]}
            padding={{ left: 20, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: -2, max: 10 }}
            yDomain={{ min: 0, max: 20 }}
            viewport={{ size: { width: 8 } }}
          >
            <VerticalAxis tickCount={6} theme={{ labels: { label: { color: colors.primary, fontWeight: '700' } }, axis: {visible: false}, grid: {visible: false}, ticks: {visible: false} }} />
            <HorizontalAxis tickCount={5} theme={{ labels: { label: { color: colors.primary, fontWeight: '700' } }, axis: {visible: false}, grid: {visible: false}, ticks: {visible: false} }}/>
            {/* <Area theme={{ gradient: { from: { color: colors.primary }, to: { color: colors.primary, opacity: 0.4 } }}} /> */}
            <Line smoothing="bezier" theme={{ stroke: { color: hexToRgba(colors.primary)(0.5), width: 5 }, scatter: { default: { width: 6, height: 6, rx: 3, color: colors.primary }} }} />
          </Chart>
        </Card>
      </ScrollView>
    </>
  );
}

const TestLineChart = React.memo(() => {
  const { colors } = useTheme()
  
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    fillShadowGradientFrom: 'white',
    fillShadowGradientTo: 'white',
    color: hexToRgba(colors.primary),
    strokeWidth: 5,
    barRadius: 10,
    propsForVerticalLabels: {
      fontSize: 10, 
      fontWeight: '700'
    },
    propsForHorizontalLabels: {
      fontSize: 10,
      fontWeight: '700',
    },
    decimalPlaces: 0,
  };
  
  const data = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        data: [20, 45, 28, 80, 20, 43, 40],
      }
    ]
  };

  return (
    <LineChart
      data={data}
      width={screenWidth - 60}
      height={180}
      chartConfig={chartConfig}
      bezier
      style={{
          paddingTop: 16, // 16 default
          paddingRight: 48, // 64 default
      }}
      segments={4}
      fromZero
    />
  )
})

const hexToRgba = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (opacity=1) => `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default StatScreen
