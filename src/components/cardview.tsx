import React from "react";
import {
  StyleSheet,
  Animated,
  ViewProps,
} from "react-native";

export interface CardViewProps extends ViewProps {}

export const CardView: React.FC<CardViewProps> = ({children, style, ...rest}) => {
  return (
    <Animated.View
      style={[styles.container, style]}
      {...rest}>
      {children}
    </Animated.View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    elevation: 10,
  },
});
