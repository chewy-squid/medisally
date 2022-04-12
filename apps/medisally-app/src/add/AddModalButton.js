import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Context from "../util/Context";
import { useTheme } from '@react-navigation/native';

const AddModalButton = () => {
  const context = React.useContext(Context);
  const { colors } = useTheme()

  return (
    <View style={{backgroundColor: colors.pure, width: 65, height: 65, marginTop: -10, borderRadius: 65, alignItems: 'center', justifyContent: 'center',
    shadowColor: "rgba(0,0,0,0.75)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    }}>
      <TouchableOpacity onPress={() => context.openModal({})}>
        <View style={{backgroundColor: colors.primary, width: 65, height: 65, borderRadius: 65, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)'}}>
          <Ionicons name="ios-add" size={40} color={colors.pure} style={{paddingLeft: 3}} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default AddModalButton
