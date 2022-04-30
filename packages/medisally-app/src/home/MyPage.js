import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import useSWR from 'swr'
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../common/Header.js'
import GradientBackground from '../common/GradientBackground.js'

const MyPage = ({navigation}) => {
  const { colors } = useTheme()
  const { data, error } = useSWR('/test')

  const [showHeaderBorder, setShowHeaderBorder] = React.useState(false)
  const scrollViewRef = React.useRef(null)

  return (
    <>
       <Header showHeaderBorder={showHeaderBorder}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 25}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} color={colors.primary} style={{marginRight: 15}}/>
          </TouchableOpacity>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.text, marginRight: 'auto'}}>마이페이지</Text>
        </View>
      </Header>

      <ScrollView 
        ref={scrollViewRef} 
        style={{flex: 1}} 
        contentContainerStyle={{padding : 7.5, paddingBottom: 30}}
        onScroll={(e) => {
          const scrollY = e.nativeEvent.contentOffset.y
          if (scrollY >= 10 && !showHeaderBorder) {
            setShowHeaderBorder(true)
          } else if (scrollY < 10 && showHeaderBorder) {
            setShowHeaderBorder(false)
          }
        }}
        scrollEventThrottle={16}
      >
        <GradientBackground/>

        <Text style={{margin: 15, fontSize: 18, fontWeight: '700', color: 'black'}}>내 정보</Text>

        <View style={{margin: 7.5, borderRadius: 15,
          shadowColor: "rgba(0,0,0,0.15)",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}>
          <View style={{overflow: 'hidden', borderRadius: 15, backgroundColor: colors.card}}>
            <TouchableOpacity>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'card', height: 55, paddingHorizontal: 20, paddingRight: 15}}>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'gray'}}>이름</Text>
                <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 'auto', marginRight: 20}}>김범준</Text>
                {/* <Ionicons name="create-outline" size={20} color={colors.gray2} style={{}}/> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{margin: 7.5, borderRadius: 15,
          shadowColor: "rgba(0,0,0,0.15)",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}>
          <View style={{overflow: 'hidden', borderRadius: 15, backgroundColor: colors.card}}>
            <TouchableOpacity>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'card', height: 55, paddingHorizontal: 20, paddingRight: 15}}>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'gray'}}>나이</Text>
                <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 'auto', marginRight: 20}}>29<Text style={{color: 'gray', fontSize: 15}}> 세</Text></Text>
                {/* <Ionicons name="create-outline" size={20} color={colors.gray2} style={{}}/> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{margin: 7.5, borderRadius: 15,
          shadowColor: "rgba(0,0,0,0.15)",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}>
          <View style={{overflow: 'hidden', borderRadius: 15, backgroundColor: colors.card}}>
            <TouchableOpacity>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'card', height: 55, paddingHorizontal: 20, paddingRight: 15}}>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'gray'}}>성별</Text>
                <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 'auto', marginRight: 20}}>남성</Text>
                {/* <Ionicons name="create-outline" size={20} color={colors.gray2} style={{}}/> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{margin: 15, marginTop: 30, fontSize: 18, fontWeight: '700', color: 'black'}}>기타</Text>

        <View style={[{padding: 15, borderRadius: 15, backgroundColor: colors.card, margin: 7.5,
          shadowColor: "rgba(0,0,0,0.5)",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }]}>
          <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, overflow: 'hidden', borderRadius: 15}}>
            <LinearGradient
              colors={['#9a0e2a', '#580818']}
              start={[0, 0]}
              end={[1, 1]}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '100%',
              }}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15, marginHorizontal: 5}}>
            <Ionicons name="alert-circle" size={25} color='white' style={{marginRight: 10, width: 25, height: 25}}/>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>데이터 복원</Text>
          </View>

          <View style={{height: 2, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 10}}/>

          <Text style={{color: 'white', marginBottom: 15, fontSize: 15, fontWeight: '600'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</Text>
        
          <TouchableOpacity>
            <View style={{padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10}}>
              <Ionicons name='call' size={15} color={'white'} style={{marginRight: 10}}/>
              <Text style={{fontSize: 15, color: 'white', fontWeight: '700'}}>010-1234-1234</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

export default MyPage
