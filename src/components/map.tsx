import React from "react";
import MapView, { MapViewProps } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export interface RNMap extends MapViewProps {
  children?: React.ReactNode;
}

export const RNMap = React.forwardRef<MapView, RNMap>(({
  style,
  children,
  ...rest
}, ref) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={ref}
          style={[styles.map, style]}
          {...rest}
        />
      </View>
      {children}
    </View>
  );
});

export default RNMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    position: "absolute",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 1,
  },
});
