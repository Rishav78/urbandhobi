import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface LoadingProps {
  loading: boolean;
  message?: string;
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({
  loading,
  children,
  message,
}) => {
  return (
    <View>
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
