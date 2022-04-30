import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreenStack from './home/HomeScreen.js'
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
          },
          tabBarBackground: () => (
            <View style={{ flex: 1 }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.05)"]}
                style={{ height: 10, position: 'absolute', width: '100%', top: -10 }}
              />
            </View>
          ),
          tabBarInactiveTintColor: '#bdc4cb',
          tabBarStyle: {height:90, backgroundColor: '#fafbfa'},
          tabBarLabelStyle: {marginTop: -15},
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeScreenStack} options={{ title: '홈', headerShown: false }}/>
        <Tab.Screen name="Pay" component={AddScreen} options={{
          tabBarButton: () => (<AddModalButton/>),
        }} />
        <Tab.Screen name="Stats" component={StatsScreen} options={{ title: '기록', headerShown: false }}/>
      </Tab.Navigator>
      
      <AddModal modalState={modalState}/>
    </Provider>
  );
}

export default AppContainer
