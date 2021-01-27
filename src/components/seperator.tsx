import React, {memo} from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export interface SeperatorProps {
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const Seperator: React.FC<SeperatorProps> = memo(({
  style = {},
  contentContainerStyle = {},
}) => {
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <View style={[styles.line, style]} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  line: {
    display: "flex",
    flex: 1,
    height: 2,
    backgroundColor: "#F2F2F2",
  },
});
