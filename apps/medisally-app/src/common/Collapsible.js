import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useTheme } from '@react-navigation/native'
import _Collapsible from 'react-native-collapsible';

const BAR_HEIGHT = 75

const Collapsible = (props) => {
  const { colors } = useTheme()

  const [open, setOpen] = React.useState(!props.closed)
  const deg = useSharedValue(props.closed ? 180 : 0)

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${deg.value}deg` }],
    };
  });

  return (
    <View style={[{borderRadius: 15, backgroundColor: colors.card,
      shadowColor: "rgba(0,0,0,0.15)",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }, props.style]}>
      <View>
        <TouchableOpacity onPress={() => {
          setOpen(!open)
          deg.value = withTiming(deg.value === 180 ? 0 : 180)
        }}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal:15, height: BAR_HEIGHT}}>
            <View style={{width: 12, height: 12, borderRadius: 12, backgroundColor: 'tomato', marginRight: 10}}/>
            <Text style={{fontSize: 20, fontWeight: '700', color: colors.text}}>{props.title}</Text>
            {/* <Animated.View style={[buttonStyle, {marginLeft: 'auto'}]}>
              <Ionicons name="chevron-up" size={25} color={colors.gray3} />
            </Animated.View> */}
            <TouchableOpacity style={{marginLeft: 'auto'}}>
              <View style={{padding: 10}}>
                <View style={{backgroundColor: '#ddd', borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: 35, height: 35,
                shadowColor: "rgba(0,0,0,0.25)",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
              }}>
                  <Ionicons name="bar-chart" size={18} color={'#999'} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <_Collapsible collapsed={!open} enablePointerEvents={true} style={{overflow: 'hidden'}}>
          <View style={{height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginHorizontal: 15}}/>
          {props.children}
        </_Collapsible>
      </View>
    </View>
  )
}

export default Collapsible
