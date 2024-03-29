import React, { useCallback, useState, memo } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  Text,
  StyleProp,
  TextStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";

export interface Input extends TextInputProps {
  contentContainerStyle?: ViewStyle;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

export const Input: React.FC<Input> = memo(({
  contentContainerStyle = {},
  style = {},
  title,
  titleStyle,
  secureTextEntry,
  ...textinput
}) => {
  const [isfocus, setFocus] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState(true);

  const onFocusIn = useCallback(() => {
    setFocus(true);
  }, []);

  const onFocusOut = useCallback(() => {
    setFocus(false);
  }, []);

  const passwordShowAndHide = useCallback(() => {
    setHidePassword(prevState => !prevState);
  }, []);

  return (
    <View style={contentContainerStyle}>
      {title &&
        <Text
          style={[styles.title, titleStyle]}>
          {title}
        </Text>
      }
      <View style={[
        styles.container,
        isfocus ? styles.containerFocus : styles.containerBlur,
      ]}>
        <View style={styles.inputContainer}>
          <TextInput
            {...textinput}
            secureTextEntry={secureTextEntry === true ? hidePassword : undefined}
            style={[styles.input, style]}
            onFocus={onFocusIn}
            onBlur={onFocusOut}
          />
        </View>
        {secureTextEntry &&
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={passwordShowAndHide}>
            {hidePassword ?
              <Entypo
                name="eye"
                size={24}
                color="black" /> :
              <Entypo
                name="eye-with-line"
                size={24}
                color="black" />
            }
          </TouchableOpacity>
        }
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  containerFocus: {
    borderBottomColor: "#333",
  },
  containerBlur: {
    borderBottomColor: "#B6B6B6",
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    paddingVertical: 2,
  },
});
