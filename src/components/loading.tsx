import * as React from "react";
import { Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface LoadingProps {
  loading: boolean;
  message?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Loading: React.FC<LoadingProps> = ({
  loading,
  children,
  message,
  style
}) => {
  return (
    <View style={style}>
      {loading ?
        <Text style={styles.message}>{message || "Loading..."}</Text> :
        children
      }
    </View>
  );
};

export default React.memo(Loading);

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
  },
});
