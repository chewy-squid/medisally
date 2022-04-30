import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 25}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.text, marginRight: 'auto'}}>기록</Text>
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

        <Text style={{margin: 7.5, fontSize: 20, fontWeight: '700'}}>증상</Text>

        <View style={{margin: 7.5, borderRadius: 15,
          shadowColor: "rgba(0,0,0,0.15)",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}>
          <View style={{overflow: 'hidden', borderRadius: 15, backgroundColor: colors.card}}>
            {[1,2,3,4,5,6,7,8].map((item, index) => (
              <React.Fragment key={index}>
                {index !== 0 && 
                  <View style={{height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 40}}/>
                }
                <TouchableOpacity key={index}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'card', height: 55, paddingHorizontal: 20, paddingRight: 15}}>
                    <View style={{width: 10, height: 10, borderRadius: 10, backgroundColor: 'tomato', marginRight: 15}}/>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>증상 {item}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray2} style={{marginLeft: 'auto'}}/>
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default StatsScreen
