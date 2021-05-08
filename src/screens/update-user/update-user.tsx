import { useNavigation } from "@react-navigation/core";
import { useUser } from "@urbandhobi/hooks";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Button, TextInput } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const theme = { colors: { primary: "#333" } };

interface UpdateUserProps { }

const UpdateUser = ({ }: UpdateUserProps) => {

  const { user } = useUser();
  const {goBack} = useNavigation();

  const [firstName, setFirstName] = useState((user && user.firstName) || "");
  const [lastName, setLastName] = useState((user && user.lastName) || "");
  const [number, setNumber] = useState((user && user.number) || "");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Appbar.Header theme={{colors: {primary: "#fff"}}}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Update Profile" />
      </Appbar.Header>
      {user ?
        <View style={{flex: 1}}>
          <View style={{ flex: 1 }}>
            <View style={styles.itemContiner}>
              <TextInput
                disabled
                theme={theme}
                style={styles.textinput}
                mode="outlined"
                keyboardType="email-address"
                value={user.email}
                label="Email (Required)*"
              />
            </View>
            <View style={styles.itemContiner}>
              <TextInput
                theme={theme}
                style={styles.textinput}
                mode="outlined"
                value={firstName}
                onChangeText={setFirstName}
                label="First name (Required)*"
              />
            </View>
            <View style={styles.itemContiner}>
              <TextInput
                theme={theme}
                style={styles.textinput}
                mode="outlined"
                value={lastName}
                onChangeText={setLastName}
                label="Last name (Required)*"
              />
            </View>
            <View style={styles.itemContiner}>
              <TextInput
                theme={theme}
                style={styles.textinput}
                mode="outlined"
                value={number}
                onChangeText={setNumber}
                label="Number (Required)*"
              />
            </View>
          </View>
          <View style={styles.itemContiner}>
            <Button contentStyle={styles.submitButtonContent} mode="contained" theme={theme}>
              <Text>Update</Text>
            </Button>
          </View>
        </View> : null}
    </SafeAreaView>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {},
  itemContiner: {
    paddingHorizontal: 15,
    marginTop: 12,
  },
  textinput: {
    height: hp("7%"),
    fontSize: wp("3.5%"),
    backgroundColor: "#fff",
    padding: 0,
  },
  submitButtonContent: {
    paddingVertical: wp("2%"),
  },
});
