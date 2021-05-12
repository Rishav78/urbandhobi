import React, { useCallback } from "react";
import { View, StyleSheet, Alert, SafeAreaView, Text } from "react-native";
import { ResponseToken } from "@urbandhobi/@types";
import { useForm, UseFormProps } from "@urbandhobi/hooks/form";
import { api } from "@urbandhobi/lib/config";
import { getValidator } from "@urbandhobi/lib/helpers/validator";
import { Heading } from "../components";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import { Appbar, Button, Divider, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { globalStyles, theme } from "@urbandhobi/lib/constants";

export interface SignupForm {
  email: string;
  password: string;
  confirm: string;
}

export interface SignupWithEmailProps { }

const form: UseFormProps = {
  action: api.auth.SIGNUP,
  method: "PUT",
  fields: [
    {
      name: "email",
      type: "email",
    },
    {
      name: "password",
      type: "password",
    },
    {
      name: "confirm",
      type: "string",
      validator: (confirm, data) => {
        getValidator()
          .comparePassword(data.password, confirm);
        return true;
      },
      send: false,
    },
  ],
};

export const SignupWithEmailScreen: React.FC<SignupWithEmailProps> = ({ }) => {
  const { navigateToSignin } = useNavigate();
  const { goBack } = useNavigation();
  const { getValue, setValue, submit, error } = useForm<SignupForm>(form, { email: "", password: "", confirm: "" });

  const { email, password, confirm } = getValue();
  const disable = error.error;

  const onEmailChangeHandler = useCallback((text: string) => {
    setValue<string>("email", text.toLowerCase());
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setValue<string>("password", text);
  }, []);

  const onConfirmChangeHandler = useCallback((text: string) => {
    setValue("confirm", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await submit<ResponseToken>();
      Alert.alert("ACCOUNT CREATED", undefined, [
        {
          text: "Ok",
          onPress: () => navigateToSignin(),
          style: "default",
        },
      ]);
    }
    catch (err) {
      console.error(err);
      Alert.alert(err.message);
    }
  }, [confirm]);

  return (
    <SafeAreaView style={globalStyles.safearea}>
      <Appbar.Header theme={{ colors: { primary: "#fff" } }}>
        <Appbar.BackAction onPress={goBack} />
      </Appbar.Header>
      <View style={styles.container}>
        <Heading
          title="SIGNUP"
          subTitle="SIGNUP with your email and password"
          contentContainerStyle={styles.heading} />
        <Divider style={styles.seprator} />
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
              mode="outlined"
              label="Password (Required)*" />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              theme={theme.dark}
              onChangeText={onConfirmChangeHandler}
              value={confirm}
              style={globalStyles.textinput}
              secureTextEntry
              mode="outlined"
              label="Confirm Password (Required)*" />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={onSubmit} disabled={disable} theme={theme.dark} mode="contained" style={globalStyles.button} contentStyle={globalStyles.buttonContent}>
            <Text>Create Account</Text>
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
