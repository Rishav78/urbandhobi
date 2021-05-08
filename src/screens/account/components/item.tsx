import * as React from "react";
import { Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface ItemProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
interface IconProps {
  icon: string | React.FC<any>;
}
interface ContentProps {
  title: string;
}

export const Item: React.FC<ItemProps> = ({ children, style, onPress }) => {
  return (
    <TouchableRipple onPress={onPress}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </TouchableRipple>
  );
};

export const Content = ({ title }: ContentProps) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export const Icon = ({ icon: IconComponent }: IconProps) => {
  return (
    <View style={{ marginRight: wp("2%") }}>
      {typeof IconComponent === "string" ?
        <MaterialIcons
          name={IconComponent}
          size={22}
          color="#666666" /> :
        <IconComponent color="#666666" size={22} />
      }
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: hp("2.2%"),
  },
  icon: {
    marginVertical: wp("3%"),
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: wp("3.8%"),
    color: "#333",
  },
});
