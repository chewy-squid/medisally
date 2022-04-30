import * as React from 'react';
import { View, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import Context from "../util/Context";
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AddModal = (props) => {
  const context = React.useContext(Context);
  const { colors } = useTheme()

  return (
    <Modal
      backdropOpacity={0.3}
      isVisible={props.modalState.open}
      onBackdropPress={() => context.closeModal()}
      style={{margin: 0}}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
    >
      <View style={{backgroundColor: '#eee', flex: 1}}>
        <View style={{backgroundColor: '#eee', position: 'absolute', top: -450, height: 500, width: '100%'}}/>
        {/* <LinearGradient
          colors={['#ddd', 'white']}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
          }}
        /> */}
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          </View>

          <View style={{flexDirection: 'row', height: 85, padding: 10}}>
            <TouchableOpacity onPress={() => context.closeModal()}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 12.5, backgroundColor: '#adadad', width: 65, height: 65, 
              shadowColor: "rgba(0,0,0,0.5)",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}>
                <Ionicons name="arrow-back-circle" size={30} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1, marginLeft: 10}}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 12.5, height: 65,
              shadowColor: "rgba(0,0,0,0.5)",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}>
              <View style={{borderRadius: 12.5, overflow: 'hidden', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
              <LinearGradient
                colors={['#199c4b', '#179b87']}
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
                <Ionicons name="checkmark-circle" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  )
}

export default AddModal
