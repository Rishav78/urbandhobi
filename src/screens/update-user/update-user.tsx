import { useNavigation } from "@react-navigation/core";
import { useUser } from "@urbandhobi/hooks";
import { globalStyles, theme } from "@urbandhobi/lib/constants";
import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Platform } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

interface UpdateUserProps { }

const HEADER_TITLE = Platform.select({ios: "UPDATE PROFILE", android: "Update Profile"});

const UpdateUser = ({ }: UpdateUserProps) => {

  const { user } = useUser();
  const {goBack} = useNavigation();

  const [firstName, setFirstName] = useState((user && user.firstName) || "");
  const [lastName, setLastName] = useState((user && user.lastName) || "");
  const [number, setNumber] = useState((user && user.number) || "");

  return (
    <SafeAreaView style={globalStyles.safearea}>
      <Appbar.Header style={globalStyles.headerContainer} theme={theme.light}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={HEADER_TITLE} />
      </Appbar.Header>
      {user ?
        <View style={{flex: 1}}>
          <View style={{ flex: 1 }}>
            <View style={styles.itemContiner}>
              <TextInput
                disabled
                theme={theme.dark}
                style={styles.textinput}
                mode="outlined"
                keyboardType="email-address"
                value={user.email}
                label="Email (Required)*"
              />
            </View>
            <View style={styles.itemContiner}>
              <TextInput
                theme={theme.dark}
                style={styles.textinput}
                mode="outlined"
                value={firstName}
                onChangeText={setFirstName}
                label="First name (Required)*"
              />
            </View>
            <View style={styles.itemContiner}>
              <TextInput
                theme={theme.dark}
                style={styles.textinput}
                mode="outlined"
                value={lastName}
                onChangeText={setLastName}
                label="Last name (Required)*"
              />
            </View>
            <View style={styles.itemContiner}>
              <TextInput
                theme={theme.dark}
                style={styles.textinput}
                mode="outlined"
                value={number}
                onChangeText={setNumber}
                label="Number (Required)*"
              />
            </View>
          </View>
          <View style={styles.itemContiner}>
            <Button contentStyle={styles.submitButtonContent} mode="contained" theme={theme.dark}>
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
