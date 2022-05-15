import * as React from 'react';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2'

const Card = (props) => {
  return (
    <Shadow
      viewStyle={{alignSelf: 'stretch', padding: 15, borderRadius: 15, backgroundColor: 'white'}}
      distance={20}
      offset={[0, 5]}
      startColor='rgba(0,0,0,0.03)'
      containerViewStyle={[{margin: 7.5}, props.style]}
    >
      {props.children}
    </Shadow>
  );
}

export default Card
