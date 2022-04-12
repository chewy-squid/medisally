import * as React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import Context from "../util/Context";
import { useTheme } from '@react-navigation/native';

const AddModal = (props) => {
  const context = React.useContext(Context);
  const { colors } = useTheme()

  return (
    <Modal
      backdropOpacity={0.3}
      isVisible={props.modalState.open}
      onBackdropPress={() => context.closeModal()}
      style={{margin: 0}}
    >
      <View style={{backgroundColor: colors.pure, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="닫기" onPress={() => context.closeModal()}/>
      </View>
    </Modal>
  )
}

export default AddModal
