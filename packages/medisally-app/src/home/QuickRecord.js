import * as React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const QuickRecordBox = (props) => {
  return (
    <ScrollView horizontal contentContainerStyle={{padding: 7.5}} showsHorizontalScrollIndicator={false} >
      {[1,2,3,4,5].map(i => <QuickRecordItem key={i}/>)}
    </ScrollView>
  )
} 

const QuickRecordItem = (props) => {
  const { colors } = useTheme()

  return (
    <View style={{alignItems: 'center', margin: 7.5, width: 80, backgroundColor: colors.background, borderRadius: 10, padding: 10,
      shadowColor: "rgba(0,0,0,0.15)",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }}>
      <View style={{flex: 1, width: 60, alignItems: 'center', justifyContent: 'center', paddingVertical: 5}}>
        <Text style={{fontSize: 15, color: colors.gray, fontWeight: '700'}}>12:30</Text>
      </View>

      <View style={{flex: 1}}>
        <Ionicons name="happy" size={60} color={colors.blue} style={{opacity: 1, marginTop: 7.5}}/>
      </View>

      {/* <View style={{flex: 1, width: 60, alignItems: 'center', justifyContent: 'center', paddingVertical: 5, borderWidth: 1, borderRadius: 7.5, borderColor: colors.gray2, backgroundColor: '#fafafa'}}>
        <Text style={{fontSize: 13, color: colors.gray2, backgroundColor: '#fafafa', fontWeight: '700'}}>상세</Text>
      </View> */}
    </View>
  )
}

export default QuickRecordBox