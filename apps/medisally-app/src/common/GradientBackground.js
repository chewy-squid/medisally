import * as React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const WIDTH = Dimensions.get('window').width

const GradientBackground = (props) => {
  const { colors } = useTheme()

  return (
    <>
      <View style={{backgroundColor: colors.card, width: WIDTH, height: 500, position: 'absolute', top: -500}}/>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[colors.card, colors.background]}
        style={{ height: 100, position: 'absolute', width: WIDTH , top: 0 }}
      />
    </>
  )
}

export default GradientBackground
