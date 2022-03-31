import * as React from 'react';
import { Text, View } from 'react-native';
import useSWR from 'swr'

const StatsScreen = () => {
  const { data, error } = useSWR('/test')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>StatsScreen</Text>
    </View>
  );
}

export default StatsScreen
