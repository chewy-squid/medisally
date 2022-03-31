import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Context from "../util/Context";

const AddModalButton = () => {
  const context = React.useContext(Context);

  return (
    <View style={{backgroundColor: 'white', width: 70, height: 70, marginTop: -30, borderRadius: 70, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => context.openModal({})}>
        <View style={{backgroundColor: 'dodgerblue', width: 70, height: 70, borderRadius: 70, alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons name="ios-add" size={40} color="white" style={{paddingLeft: 3}} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default AddModalButton
