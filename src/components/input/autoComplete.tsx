import React from "react";
import { StyleSheet, Text, View, Modal, ModalProps } from "react-native";
import { Input } from "./textinput";

export interface AutoCompleteProps extends ModalProps { }

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  animationType = "slide",
  statusBarTranslucent = false,
  ...modalProps
}) => {
  return (
    <Modal
      {...modalProps}
      animationType={animationType}
      statusBarTranslucent={statusBarTranslucent}>
        <View>
          <Input />
          <Text>Text</Text>
          <Text>Text</Text>
          <Text>Text</Text>
          <Text>Text</Text>
        </View>
    </Modal>
  );
};

export default AutoComplete;

const styles = StyleSheet.create({});
