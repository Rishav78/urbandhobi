import React, { useCallback } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  TextStyle,
} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  transparent?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  title,
  style = {},
  textStyle = {},
  transparent,
  activeOpacity = 0.9,
  ...rest
}) => {

  const getButtonStyle = useCallback(() => {
    const buttonStyle: StyleProp<ViewStyle> = [styles.container];
    if (rest.disabled) {
      buttonStyle.push(styles.containerDisable);
    }
    else {
      buttonStyle.push(styles.containerEnable);
    }
    if (transparent) {
      buttonStyle.push(styles.transparent);
    }
    return buttonStyle;
  }, [rest.disabled]);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      {...rest}
      style={[getButtonStyle(), style]}
    >
      { children ? children :
        <Text style={[styles.text, textStyle]}>{title}</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderRadius: 5,
    elevation: 5,
  },
  containerDisable: {
    backgroundColor: "#BDC0C7",
  },
  containerEnable: {
    backgroundColor: "#737373",
  },
  transparent: {
    backgroundColor: "transparent",
    elevation: 0,
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
