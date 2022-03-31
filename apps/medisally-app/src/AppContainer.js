import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import HomeScreen from './home/HomeScreen.js'
import StatsScreen from './stats/StatsScreen.js'

import AddModal from './add/AddModal.js'
import AddModalButton from './add/AddModalButton.js'

import { Provider } from './util/Context'

const AddScreen = () => {}

const Tab = createBottomTabNavigator();

const AppContainer = () => {
  const [modalState, setModalState] = React.useState({open: false, initialData: {}})

  const openModal = (initialData) => {
    setModalState({open: true, initialData})
  }

  const closeModal = () => {
    setModalState({open: false, initialData: {}})
  }

  const [context] = React.useState({
    openModal,
    closeModal
  })

  return (
    <Provider value={context}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name={route.name === 'Home' ? 'home' : 'bar-chart'} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }}/>
        <Tab.Screen name="Pay" component={AddScreen} options={{
          tabBarButton: () => (<AddModalButton/>),
        }} />
        <Tab.Screen name="Stats" component={StatsScreen} options={{ title: '통계' }}/>
      </Tab.Navigator>
      
      <AddModal modalState={modalState}/>
    </Provider>
  );
}

export default AppContainer
