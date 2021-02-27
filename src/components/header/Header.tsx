import React, { memo } from "react";
import {
  StyleSheet,
  Animated,
  ViewProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { HEADER_HEIGHT } from "./header.helper";
import HeaderLeft from "./headerLeft";

export type Props = ViewProps & {
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerLeftContainerStyle?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
  titleContainerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  title?: string;
  subTitle?: string;
  titleStyle?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
  subTitleStyle?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;

  headerLeft?: React.ReactNode;
  headerRight?: React.FunctionComponent;
  headerTitle?: React.ReactNode;
};

const Header: React.FC<Props> = memo(({
  headerContainerStyle = {},
  headerLeftContainerStyle,
  titleContainerStyle,
  title,
  subTitle,
  titleStyle,
  subTitleStyle,
  headerLeft: HeaderL,
  headerRight: HeaderR,
  headerTitle: HeaderT,
}) => {

  const { height = HEADER_HEIGHT, ...rest } = StyleSheet.flatten(headerContainerStyle);
  return (
    <Animated.View style={[styles.container, { height }, rest]}>
      { HeaderL === undefined ?
        <Animated.View style={headerLeftContainerStyle}>
          <HeaderLeft />
        </Animated.View> :
        HeaderL !== null ? HeaderL : null
      }

      <View style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: "100%"}}>
        {HeaderT ?
          HeaderT :
          <Animated.View style={[styles.titleContainer, titleContainerStyle]}>
            {title && <Animated.Text style={[styles.title, titleStyle]}>{title}</Animated.Text>}
            {subTitle && <Animated.Text style={[styles.subTitle, subTitleStyle]}>{subTitle}</Animated.Text>}
          </Animated.View>
        }
      </View>
      <View style={{flex: 1}} />

      {HeaderR ? 
      <View style={{marginHorizontal: wp("3%"), justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "row"}}>
        <HeaderR />
      </View>
      : null}
    </Animated.View>
  );
});

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    margin: 0,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  title: Platform.select({
    ios: {
      fontSize: 17,
      fontWeight: "600",
    },
    android: {
      fontSize: 20,
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    default: {
      fontSize: 18,
      fontWeight: "500",
    },
  }),
  subTitle: Platform.select({
    ios: {
      fontSize: 11,
    },
    android: {
      fontSize: 14,
      fontFamily: "sans-serif-medium",
    },
    default: {
      fontSize: 13,
      fontWeight: "500",
    },
  }),
});
