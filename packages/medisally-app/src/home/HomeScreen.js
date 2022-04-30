import * as React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import useSWR from 'swr'
import { useTheme } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'

import MyPage from './MyPage.js'

import Collapsible from '../common/Collapsible.js'
import QuickRecordBox from './QuickRecord.js'
import Callout from './Callout'
import CheckList from './CheckList.js'
import Calendar from './Calendar.js'
import Header from '../common/Header.js'
import GradientBackground from '../common/GradientBackground.js'

const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="MyPage" component={MyPage} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

const HomeScreen = ({navigation}) => {
  const { colors } = useTheme()
  const { data, error } = useSWR('/test')

  const [showHeaderBorder, setShowHeaderBorder] = React.useState(false)
  const scrollViewRef = React.useRef(null)

  return (
    <>
      <Header showHeaderBorder={showHeaderBorder}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.text}}>홈</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
            <Ionicons name="person-circle" size={35} style={{color: colors.gray}}/> 
          </TouchableOpacity>
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

        <Collapsible title="증상 1" closed style={{margin: 7.5}}>
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

export default HomeScreenStack
