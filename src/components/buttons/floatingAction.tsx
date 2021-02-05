import React from "react";
import { StyleProp, StyleSheet, Text, TextProps, TouchableOpacityProps, View, ViewStyle } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Clickable } from "../click";

export interface FloatingActionProps extends TouchableOpacityProps {
  icon?: React.FC<TextProps>;
  title?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const FloatingAction: React.FC<FloatingActionProps> = ({
  icon: Icon,
  title,
  children,
  contentContainerStyle,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <Clickable {...rest} style={[styles.clickable, style]}>
        {children ? children :
          title ? <Text style={styles.text}>{title}</Text> :
            (Icon && <Icon />)
        }
      </Clickable>
    </View>
  );
};

export default FloatingAction;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: wp("18%"),
    height: wp("18%"),
    borderRadius: wp("18%") / 2,
    bottom: hp("2%"),
    right: hp("2%"),
    overflow: "hidden",
    backgroundColor: "#000",
    elevation: 10,
  },
  clickable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: wp("4%"),
  },
});
