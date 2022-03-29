import React from 'react'
import { Text, View } from 'react-native';
import useSWR, { SWRConfig } from 'swr'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import MSD from 'medisally-data'
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [msd, setMsd] = React.useState(null)

  React.useEffect(() => {
    const loadMSD = async () => {
      let userID = await AsyncStorage.getItem('userID')
      if (!userID) {
        userID = uuid.v4()
        await AsyncStorage.setItem('userID', userID)
      }

      const filename = 'userData.json'

      const load = async () => {
        const file = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + filename)
        if (file) {
          return JSON.parse(file)
        }
        return {}
      }

      const save = async (json) => {
        await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + filename, JSON.stringify(json))
      }

      const msdInstance = new MSD({userID, load, save})
      await msdInstance.init()
      setMsd(msdInstance)

      save({})
    }

    loadMSD()
  }, [])

  if (!msd) {
    return (
      <View/>
    )
  }

  return (
    <SWRConfig value={{fetcher: (...args) => msd.fetcher(...args)}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <InnerComponent/>
      </View>
    </SWRConfig>
  );
}

const InnerComponent = () => {
  const { data, error } = useSWR('/test')

  return (
    <View>
      <Text>{data || 'failed...'}</Text>
    </View>
  )
}
