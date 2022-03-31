import * as React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import Context from "../util/Context";

const AddModal = (props) => {
  const context = React.useContext(Context);

  return (
    <Modal
      backdropOpacity={0.3}
      isVisible={props.modalState.open}
      onBackdropPress={() => context.closeModal()}
      style={{margin: 0}}
    >
      <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="close" onPress={() => context.closeModal()}/>
      </View>
    </Modal>
  )
}

export default AddModal
