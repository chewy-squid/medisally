import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar as _Calendar } from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';

const checkDay = (value) => value.split(" ")[1] === '토요일' || value.split(" ")[1] === '일요일'

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

  const styles = {
    dark: {
      name: 'dark',
      background: '#1d2225',
      titleBackground: 'crimson',
      title: 'white',
      todayBackground: 'crimson',
      day: '#d5d6d8',
      dayDisabled: '#8c8f91',
      today: '#d5d6d8',
      extra: '#222'
    },
    light: {
      name: 'light',
      background: colors.card,
      titleBackground: 'crimson',
      title: 'white',
      todayBackground: 'crimson',
      day: colors.text,
      dayDisabled: colors.gray,
      today: 'white',
      extra: '#ddd'
    },
    darkClean: {
      name: 'darkClean',
      background: '#1d2225',
      titleBackground: 'crimson',
      title: 'white',
      todayBackground: 'crimson',
      day: '#d5d6d8',
      dayDisabled: '#8c8f91',
      today: '#d5d6d8',
      extra: '#555'
    },
    lightClean: {
      name: 'lightClean',
      background: colors.card,
      titleBackground: 'crimson',
      title: 'black',
      todayBackground: '#fd2b2e',
      day: colors.text,
      dayDisabled: colors.gray,
      today: 'white',
      extra: '#ddd'
    },
  }
  
  const style = styles.lightClean

  return (
    <View style={[{padding: 0, borderRadius: 15, backgroundColor: style.background, 
      shadowColor: "rgba(0,0,0,0.15)",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }, props.style]}>
      <_Calendar
        // hideExtraDays={true}
        hideDayNames={true}
        theme={{
          calendarBackground: 'transparent',
          textSectionTitleColor: style.day,
          textSectionTitleDisabledColor: style.dayDisabled,
          textDayFontWeight: '700',
          'stylesheet.calendar.main': {
            container: {
              paddingLeft: 0,
              paddingRight: 0,
              backgroundColor: 'transparent'
            },
            monthView: {
              marginVertical: 15,
              marginHorizontal: 15
            },
          },
          'stylesheet.calendar.header': {
            header: {
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: 0,
            }
          }
        }}
        disabledDaysIndexes={[0, 6]}
        hideArrows
        renderHeader={(dateString) => {
          const date = new Date(dateString);
          return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 15, flex: 1, borderBottomWidth: ['lightClean', 'darkClean'].includes(style.name) ? 0 : 2, borderColor: 'rgba(0,0,0,0.2)'}}>
              {!['lightClean', 'darkClean'].includes(style.name) &&
                <View style={{overflow: 'hidden', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#fd2b2e", "crimson"]}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                  />
                </View>
              }
              <Text style={{fontSize: 20, fontWeight: 'bold', color: style.title, marginHorizontal: 25, marginTop: ['lightClean', 'darkClean'].includes(style.name) ? 10 : 0, marginBottom: ['lightClean', 'darkClean'].includes(style.name) ? -10 : 0}}>{date.getFullYear()}년 {date.getMonth()+1}월</Text>
              {/* <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={["rgba(255,255,255,0)", "rgba(255,0,0,0.1)"]}
                style={{ height: 50, position: 'absolute', width: '100%', bottom: -50 }}
              /> */}
            </View>
          )
        }}
        markingType={'multi-dot'}
        markedDates={{
          '2022-05-11': {dots: [
            {key: '1', color: 'tomato'},
            {key: '2', color: 'dodgerblue'},
            {key: '3', color: 'hotpink'}
          ]},
          '2022-05-22': {dots: [
            {key: '1', color: 'orange'},
            {key: '2', color: 'forestgreen'},
            {key: '3', color: 'silver'}
          ]},
          '2022-05-21': {dots: [
            {key: '1', color: 'dodgerblue'},
          ],
          flags: [
            {key: '1', color: 'tomato'}
          ]},
          '2022-05-30': {dots: [
            {key: '1', color: 'dodgerblue'},
          ]},
        }}
        dayComponent={({accessibilityLabel, date, state, marking}) => {
          return (
            <View style={{width: 30, height: 30, margin: 0}}>
              <View style={{width: 30, height: 30, backgroundColor: state === 'today' ? style.todayBackground : 'transparent', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[{color: state === 'today' ? style.today : state === 'disabled' ? style.extra : style.day, fontWeight: '700'}, (checkDay(accessibilityLabel) && !state)  && {color: style.dayDisabled}]}>
                  {date.day}
                </Text>
              </View>
              <View style={{width: 30, height: 7.5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>
                {marking && marking.dots && marking.dots.map((dot, index) => (
                  <View key={index} style={{width: 5, height: 5, borderRadius: 5, backgroundColor: dot.color, marginHorizontal: 1}} />
                ))}
              </View>
              {marking && marking.flags &&
                <Ionicons name="flag" size={15} style={{color: 'tomato', position: 'absolute', top: 2, right: -7}}/>
              }
            </View>
          );
        }}
      />
    </View>
  )
}

export default Calendar
