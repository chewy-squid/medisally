import * as React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Header = (props) => {
  const inset = useSafeAreaInsets().top;

  const { colors } = useTheme()

  return (
    <View style={{backgroundColor: colors.card, zIndex: 9999}}>
      <View style={{height: inset}}/>

      <View style={{height: 55}}>
        {props.children}
      </View>

      {props.showHeaderBorder && 
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.1)"]}
          style={{ height: 2, position: 'absolute', width: '100%', bottom: -2 }}
        />
      }
    </View>
  );
}

export default Header
