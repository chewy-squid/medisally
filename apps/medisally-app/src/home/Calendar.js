import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar as _Calendar } from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'kr';

const Calendar = (props) => {
  const { colors } = useTheme()

  return (
    <View style={[{padding: 15, borderRadius: 15, backgroundColor: colors.card,
      shadowColor: "rgba(0,0,0,0.15)",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }, props.style]}>
      <_Calendar
        theme={{
          calendarBackground: 'transparent',
          todayBackgroundColor: colors.primary,
          todayTextColor: 'white',
          textDayFontWeight: '500',
        }}
        style={{backgroundColor: 'transparent'}}
        hideArrows
        renderHeader={(dateString) => {
          const date = new Date(dateString);
          return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 10, flex: 1}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text}}>{date.getFullYear()}년 {date.getMonth()+1}월</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

export default Calendar
