import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Input, Button } from "@urbandhobi/components";
import Header from "@urbandhobi/components/header/Header";
import { useForm, UseFormProps } from "@urbandhobi/hooks/form";
import { api } from "@urbandhobi/lib/config";
import { setVerified } from "@urbandhobi/redux/authentication/auth.action";
import { Heading } from "./components";
import { CreateUserForm } from "@urbandhobi/@types";
import { createUser } from "@urbandhobi/actions";
import { Divider } from "react-native-paper";

export interface UserInformationProps { }

const form: UseFormProps = {
  action: api.user.CREATE_USER,
  method: "POST",
  fields: [
    {
      name: "firstName",
      type: "string",
    },
    {
      name: "middleName",
      type: "string",
      required: false,
    },
    {
      name: "lastName",
      type: "string",
    },
  ],
};

export const UserInformation: React.FC<UserInformationProps> = ({ }) => {
  const dispatch = useDispatch();
  const { getValue, setValue, error } = useForm<CreateUserForm>(form,
    {
      firstName: "",
      middleName: "",
      lastName: "",
    }
  );

  const { firstName, lastName, middleName } = getValue();
  const disable = error.error;

  const onFirstNameChangeHandler = useCallback((text: string) => {
    setValue<string>("firstName", text);
  }, []);

  const onMiddleNameChangeHandler = useCallback((text: string) => {
    setValue<string>("middleName", text);
  }, []);

  const onLastNameChangeHandler = useCallback((text: string) => {
    setValue("lastName", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await createUser(getValue());
      dispatch(setVerified(true));
    }
    catch (err) {
      Alert.alert(err.message);
      dispatch(setVerified(false));
    }
  }, []);

  return (
    <>
      <Header
        headerLeftContainerStyle={styles.headerleft}
        headerContainerStyle={styles.header} />
      <View style={styles.container}>
        <Heading
          title="USER INFORMATION"
          subTitle="Please provide your information"
          contentContainerStyle={styles.heading} />
        <Divider />
        <View style={styles.form}>
          <Input
            onChangeText={onFirstNameChangeHandler}
            value={firstName}
            contentContainerStyle={styles.inputContainer}
            style={[styles.input]}
            placeholder="First Name" />

          <Input
            onChangeText={onMiddleNameChangeHandler}
            value={middleName}
            contentContainerStyle={styles.inputContainer}
            style={[styles.input]}
            placeholder="Middle Name" />

          <Input
            onChangeText={onLastNameChangeHandler}
            value={lastName}
            contentContainerStyle={styles.inputContainer}
            style={[styles.input]}
            placeholder="Last Name" />
        </View>
        <Button
          disabled={disable}
          onPress={onSubmit}
          style={styles.button}
          title="FINISH" />
      </View>
    </>
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
  form: {
    marginHorizontal: 15,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    padding: 0,
    paddingVertical: 5,
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
