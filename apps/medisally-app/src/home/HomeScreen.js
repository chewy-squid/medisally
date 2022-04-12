import * as React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import useSWR from 'swr'
import { useTheme } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons'

import Collapsible from '../common/Collapsible.js'
import QuickRecordBox from './QuickRecord.js'
import Callout from './Callout'
import CheckList from './CheckList.js'
import Calendar from './Calendar.js'
import Header from '../common/Header.js'
import GradientBackground from '../common/GradientBackground.js'


const HomeScreen = () => {
  const { colors } = useTheme()
  const { data, error } = useSWR('/test')

  const [showHeaderBorder, setShowHeaderBorder] = React.useState(false)
  const scrollViewRef = React.useRef(null)

  return (
    <>
      <Header showHeaderBorder={showHeaderBorder}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.text}}>홈</Text>
          <Image source={require('../../assets/dory.jpg')} style={{width: 35, height: 35, borderRadius: 35, borderWidth: 1, borderColor: 'rgba(0,0,0,0.5)'}} />
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

        <Callout style={{margin: 7.5}}/>

        <CheckList style={{margin: 7.5}}/>

        <Calendar style={{margin: 7.5}}/>

        <Collapsible title="증상 1" style={{margin: 7.5}}>
          <QuickRecordBox/>
        </Collapsible>
        <Collapsible title="증상 2" closed style={{margin: 7.5}}>
          <QuickRecordBox/>
        </Collapsible>
        <Collapsible title="증상 3" closed style={{margin: 7.5}}>
          <QuickRecordBox/>
        </Collapsible>

        <AddSymptomButton style={{margin: 7.5}}/>
      </ScrollView>
    </>
  );
}

const AddSymptomButton = (props) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity>
      <View style={[{height: 75, alignItems: 'center', justifyContent: 'center'}, props.style]}>
        <SimpleLineIcons name="plus" size={25} color={colors.text}/>
        <Text style={{color: colors.text, fontSize: 16, fontWeight: '500', marginTop: 10}}>증상 추가</Text>
      </View>
    </TouchableOpacity>
  )
}

export default HomeScreen
