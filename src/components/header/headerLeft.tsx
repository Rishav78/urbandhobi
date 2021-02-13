import React, { useCallback, memo } from "react";
import {
  StyleSheet,
  Animated,
  BackHandler,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Clickable } from "@urbandhobi/components/click";
import { useNavigate } from "@urbandhobi/hooks/navigation";

const HeaderLeft = memo(() => {
  const { navigation } = useNavigate();

  const onBackHandler = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    else {
      BackHandler.exitApp();
    }
  }, [navigation]);

  return (
    <Animated.View style={styles.container}>
      <Clickable onPress={onBackHandler}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black" />
      </Clickable>
    </Animated.View>
  );
});

export default HeaderLeft;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
