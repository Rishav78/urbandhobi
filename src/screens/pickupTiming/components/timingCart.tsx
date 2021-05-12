import * as React from "react";
import { Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface BlockProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  fill?: boolean;
}

interface SectionProps {
  style?: StyleProp<ViewStyle>
}

export const Section: React.FC<SectionProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[style, {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    }]}>
      {children}
    </View>
  );
};

export const Block: React.FC<BlockProps> = ({
  onPress,
  text,
  style,
  fill = false,
}) => {
  return (
    <View style={[styles.container, style, fill && styles.fillContainer]}>
      <TouchableOpacity onPress={onPress} delayPressIn={0}>
        <Text style={[fill ? styles.fillText : styles.unfillText]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: wp("44%"),
    borderWidth: 1,
    borderColor: "#bfbfbf",
    paddingVertical: wp("1.5%"),
    paddingHorizontal: wp("2.5%"),
    borderRadius: 3,
  },
  fillContainer: {
    backgroundColor: "#bfbfbf",
  },
  fillText: {
    color: "#fff",
  },
  unfillText: {
    color: "#333",
  },
});
