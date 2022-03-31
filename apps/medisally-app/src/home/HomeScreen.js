import * as React from 'react';
import { Text, View } from 'react-native';
import useSWR from 'swr'

const HomeScreen = () => {
  const { data, error } = useSWR('/test')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
    </View>
  );
}

export default HomeScreen
