import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Callout = (props) => {
  const { colors } = useTheme()
  return (
    <View style={[{padding: 15, borderRadius: 15, backgroundColor: colors.card,
      shadowColor: "rgba(0,0,0,0.5)",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }, props.style]}>
      <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, overflow: 'hidden', borderRadius: 15}}>
      <LinearGradient
        colors={['#199c4b', '#179b87']}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
        }}
      />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
        <Text style={{color: 'white', marginVertical: 5, fontSize: 20, fontWeight: '700',
        shadowColor: "rgba(0,0,0,0.15)",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      }}>알림</Text>
        <Ionicons name="close-circle" size={30} color="white" style={{
          shadowColor: "rgba(0,0,0,0.5)",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}/>
      </View>

      <View style={{height: 2, backgroundColor: '#18925a', marginBottom: 10}}/>

      <Text style={{color: 'white', marginBottom: 15, fontSize: 15, fontWeight: '600'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</Text>

      <TouchableOpacity>
        <View style={{padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10}}>
          <Text style={{fontSize: 15, color: 'white', fontWeight: '700'}}>데이터 삭제 문구</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Callout
