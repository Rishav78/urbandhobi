import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Card} from "react-native-paper";

export interface MessageTileProps extends ViewProps {
  message: string;
}

export const MessageTile: React.FC<MessageTileProps> = ({
  message,
  style,
}) => {
  return (
    <Card style={[styles.container, style]}>
      <View>
      <Text style={styles.message}>{message}</Text>
      </View>
    </Card>
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
