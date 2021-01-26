import React, { useCallback } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  title,
  style,
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
    return buttonStyle;
  }, [rest.disabled]);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      {...rest}
      style={[getButtonStyle(), style]}
    >
      { children ? children :
        <Text style={styles.text}>{title}</Text>
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
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
