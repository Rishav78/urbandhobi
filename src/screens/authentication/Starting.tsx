import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components";
import { useNavigate } from "../../hooks/navigation";

export const StartingScreen = () => {

  const navigation = useNavigate();

  const onSigninClickHandler = useCallback(() => {
    navigation.navigateToSignin();
  }, []);

  const onSignupClickHandler = useCallback(() => {
    navigation.navigateToSignup();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>URBAN</Text>
        <Text style={styles.title}>DHOBI</Text>
      </View>
      <View>
        <Button
          title="LOGIN"
          style={styles.button}
          onPress={onSigninClickHandler}
        />

        <Button
          title="CREATE NEW ACCOUNT"
          style={styles.button}
          onPress={onSignupClickHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
});
