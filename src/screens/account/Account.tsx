import { useNavigation } from "@react-navigation/core";
import MessageTile from "@urbandhobi/components/messageTile";
import { RefreshScrollView } from "@urbandhobi/components/pullrefresh";
import { useAuth, useNavigate, useUser } from "@urbandhobi/hooks";
import { globalStyles, theme } from "@urbandhobi/lib/constants";
import * as React from "react";
import { Text, View, StyleSheet, Alert, SafeAreaView } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Item from "./components/item";

interface AccountProps { }

const Account = ({ }: AccountProps) => {
  const { goBack } = useNavigation();
  const { getUser, user } = useUser();
  const { navigateToUpdateUser } = useNavigate();
  const { logout } = useAuth();

  const onOrderClick = React.useCallback(() => {

  }, []);

  const onChangePasswordClick = React.useCallback(() => {

  }, []);

  const onOffersClick = React.useCallback(() => {

  }, []);

  const onShareClick = React.useCallback(() => {

  }, []);

  const onLogoutClick = React.useCallback(async () => {
    Alert.alert("Confirmation", "Are you sure want to logout", [
      {
        onPress: logout,
        text: "YES",
      },
      {
        text: "NO",
      },
    ]);
  }, []);

  const onRefresh = React.useCallback(async () => {
    await getUser();
  }, []);

  React.useEffect(() => {
    onRefresh();
  }, []);

  console.log(user);

  return (
    <SafeAreaView style={globalStyles.safearea}>
      <Appbar.Header style={globalStyles.headerContainer} theme={theme.light}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Account setting" />
        <Appbar.Action onPress={navigateToUpdateUser} icon={() => <MaterialIcons name="edit" size={24} color="black" />} />
      </Appbar.Header>
      {!user ? <MessageTile message="" /> :
        <RefreshScrollView>
          <View style={styles.section1}>
            <View style={styles.userInfoContainer}>
              <View style={styles.imageContainer}>
                <View style={{ width: "100%", height: "100%", backgroundColor: "#333" }} />
              </View>
              <View>
                <Text style={styles.name}>{(!user.firstName || !user.lastName) ? "Not provided" : `${user.firstName} ${user.lastName}`}</Text>
                <Text style={styles.contact}>{user.number || "Not provided"}, {user.email || "Not provided"}</Text>
              </View>
            </View>
            <View style={styles.item}>
              <Divider />
              <Item.Item>
                <Item.Content title="My Account" />
                <Item.Icon icon="keyboard-arrow-down" />
              </Item.Item>
              <Divider />
            </View>
            <Item.Item onPress={onOrderClick} style={styles.item}>
              <Item.Icon icon={(props) => <MaterialCommunityIcons name="note-multiple-outline" {...props} />} />
              <Item.Content title="My Orders" />
              <Item.Icon icon="keyboard-arrow-right" />
            </Item.Item>
            <Item.Item onPress={onChangePasswordClick} style={styles.item}>
              <Item.Icon icon="lock-outline" />
              <Item.Content title="Change Password" />
              <Item.Icon icon="keyboard-arrow-right" />
            </Item.Item>
            <Item.Item onPress={onOffersClick} style={styles.item}>
              <Item.Icon icon={(props) => <MaterialCommunityIcons name="note-text-outline" {...props} />} />
              <Item.Content title="Offers" />
              <Item.Icon icon="keyboard-arrow-right" />
            </Item.Item>
            <Item.Item onPress={onShareClick} style={styles.item}>
              <Item.Icon icon="share" />
              <Item.Content title="Share" />
              <Item.Icon icon="keyboard-arrow-right" />
            </Item.Item>
          </View>
          <View style={styles.section2}>
            <Item.Item onPress={onLogoutClick} style={styles.item}>
              <Item.Content title="Logout" />
              <Item.Icon icon="logout" />
            </Item.Item>
            <Item.Item onPress={onLogoutClick} style={styles.item}>
              <Item.Content title="Deactivate Account" />
              <Item.Icon icon="power-settings-new" />
            </Item.Item>
          </View>
        </RefreshScrollView>
      }
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {},
  section1: { backgroundColor: "#fff" },
  userInfoContainer: { flexDirection: "row", marginVertical: hp("2%") },
  imageContainer: { width: wp("10%"), height: wp("10%"), borderRadius: wp("10%") / 2, overflow: "hidden", marginHorizontal: wp("4%") },
  name: { fontWeight: "bold", color: "#666666" },
  contact: { color: "#666666" },
  section2: { marginVertical: hp("2%"), backgroundColor: "#fff" },
  item: {
    marginHorizontal: wp("3%"),
  },
});
