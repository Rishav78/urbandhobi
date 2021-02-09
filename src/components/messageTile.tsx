import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export interface MessageTileProps extends ViewProps {
  message: string;
}

export const MessageTile: React.FC<MessageTileProps> = ({
  message,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default MessageTile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp("1%"),
  },
  message: {
    fontSize: wp("4%"),
    color: "#333",
  },
});
