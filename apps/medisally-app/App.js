import React from 'react'
import { Text, View } from 'react-native';
import { SWRConfig } from 'swr'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import MSD from 'medisally-data'
import * as FileSystem from 'expo-file-system';
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/AppContainer'

const App = () => {
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
        const fileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + filename)
        if (fileExists.exists) {
          const file = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + filename)
          return JSON.parse(file)
        } else {
          await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + filename, JSON.stringify({}))
          return {}
        }
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
      <NavigationContainer>
        <AppContainer/>
      </NavigationContainer>
    </SWRConfig>
  );
}

export default App
