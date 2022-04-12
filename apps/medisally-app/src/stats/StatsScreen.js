import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import useSWR from 'swr'
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import Header from '../common/Header.js'
import GradientBackground from '../common/GradientBackground.js'

const StatsScreen = () => {
  const { colors } = useTheme()
  const { data, error } = useSWR('/test')

  const [showHeaderBorder, setShowHeaderBorder] = React.useState(false)
  const scrollViewRef = React.useRef(null)

  return (
    <>
       <Header showHeaderBorder={showHeaderBorder}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.text}}>기록</Text>
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
      </ScrollView>
    </>
  );
}

export default StatsScreen
