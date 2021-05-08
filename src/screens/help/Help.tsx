import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface HelpProps {}

const Help = ({}: HelpProps) => {
  return (
    <View style={styles.container}>
      <Text>Help</Text>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {},
});
