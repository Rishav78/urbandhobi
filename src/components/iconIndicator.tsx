import React, { memo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IconIndicatorProps extends ViewProps {
  icon: string | React.FunctionComponent;
}

const IconIndicator: React.FC<IconIndicatorProps> = ({
  icon: Icon,
  ...rest
}) => {
  return (
    <View {...rest}>
      {
        typeof Icon === "string" ?
          <Ionicons
            name={Icon}
            size={24}
            color="#fff" /> :
          <Icon />
      }
      <View style={styles.indicator} />
    </View>
  );
};

export default memo(IconIndicator);

const styles = StyleSheet.create({
  indicator: {
    width: wp("2%"),
    height: wp("2%"),
    borderRadius: wp("2%") / 2,
    position: "absolute",
    top: 1,
    right: 1,
    backgroundColor: "#ff0000",
  },
});
