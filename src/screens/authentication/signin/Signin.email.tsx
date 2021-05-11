import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, TextInput, Appbar } from "react-native-paper";
import { View, StyleSheet, Alert, SafeAreaView, Text } from "react-native";
import { ResponseToken } from "@urbandhobi/@types";
import { Seperator } from "@urbandhobi/components";
import { useForm, UseFormProps } from "@urbandhobi/hooks/form";
import { api } from "@urbandhobi/lib/config";
import { Heading } from "../components";
import { setVerified, signIn } from "@urbandhobi/redux/authentication/auth.action";
import { setTokens } from "@urbandhobi/lib/helpers";
import { useNavigation } from "@react-navigation/core";
import { globalStyles, theme } from "@urbandhobi/lib/constants";

export interface SigninForm {
  email: string;
  password: string;
}

export interface SigninWithEmailProps { }

const form: UseFormProps = {
  action: api.auth.SIGNIN,
  method: "POST",
  fields: [
    {
      name: "email",
      type: "email",
      validate: true,
    },
    {
      name: "password",
      type: "password",
      validate: true,
    },
  ],
};

export const SigninWithEmailScreen: React.FC<SigninWithEmailProps> = ({ }) => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { getValue, setValue, submit, error } = useForm<SigninForm>(form, { email: "", password: "" });

  const { email, password } = getValue();
  const disable = error.error;

  const onEmailChangeHandler = useCallback((text: string) => {
    setValue<string>("email", text.toLowerCase());
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setValue<string>("password", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      const { access, refresh } = await submit<ResponseToken>();
      await setTokens(access, refresh);
      // if (await isVerified()) {
      dispatch(setVerified(true));
      // }
      dispatch(signIn());
    }
    catch (err) {
      Alert.alert(err.message);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header theme={{ colors: { primary: "#fff" } }}>
        <Appbar.BackAction onPress={goBack} />
      </Appbar.Header>
      <View style={styles.container}>
        <Heading
          title="LOGIN"
          subTitle="LOGIN with your email and password"
          contentContainerStyle={styles.heading} />
        <Seperator contentContainerStyle={styles.seprator} />
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              theme={theme.dark}
              onChangeText={onEmailChangeHandler}
              value={email}
              style={globalStyles.textinput}
              mode="outlined"
              keyboardType="email-address"
              label="Email (Required)*" />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              theme={theme.dark}
              onChangeText={onPasswordChangeHandler}
              value={password}
              style={globalStyles.textinput}
              secureTextEntry
              right={<></>}
              mode="outlined"
              label="Password (Required)*" />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={onSubmit} disabled={disable} theme={theme.dark} mode="contained" style={globalStyles.button} contentStyle={globalStyles.buttonContent}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  headerleft: {
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  seprator: {
    marginVertical: 30,
  },
  form: {
    marginHorizontal: 15,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginHorizontal: 15,
  },
});
