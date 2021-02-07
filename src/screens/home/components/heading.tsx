import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Clickable } from "@urbandhobi/components/click";
import { useNavigate } from "@urbandhobi/hooks/navigation";

const Heading = () => {

  const { navigateToAddress } = useNavigate();

  return (
    <View style={styles.container}>
      <Clickable
        style={styles.clickable}
        onPress={navigateToAddress}>
        <Text
          numberOfLines={1}
          style={styles.addressTitle}>HOME</Text>
        <Text
          numberOfLines={1}
          style={styles.address}>404, Premlata enclave</Text>
      </Clickable>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  clickable: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 20,
  },
  addressTitlecontainer: {
    display: "flex",
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  addressTitle: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "bold",
  },
  address: {
    fontSize: 12,
    color: "#4A4A4A",
  },
});
