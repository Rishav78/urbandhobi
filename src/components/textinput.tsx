import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";

export interface Input extends TextInputProps {
  contentContainerStyle?: ViewStyle;
}

export const Input: React.FC<Input> = ({
  contentContainerStyle = {},
  style = {},
  ...textinput
}) => {
  const [isfocus, setFocus] = useState<boolean>(false);

  const onFocusIn = useCallback(() => {
    setFocus(true);
  }, []);

  const onFocusOut = useCallback(() => {
    setFocus(false);
  }, []);

  const getInputStyles = useCallback(() => {
    const inputStyle: StyleProp<TextStyle> = [styles.input];
    if (isfocus) {
      inputStyle.push(styles.inputFocus);
    }
    else {
      inputStyle.push(styles.inputBlur);
    }
    return inputStyle;
  }, [isfocus]);

  return (
    <View style={[contentContainerStyle]}>
      <TextInput
        {...textinput}
        style={[getInputStyles(), style]}
        onFocus={onFocusIn}
        onBlur={onFocusOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
  },
  inputFocus: {
    borderBottomColor: "#333",
  },
  inputBlur: {
    borderBottomColor: "#B6B6B6",
  },
});
