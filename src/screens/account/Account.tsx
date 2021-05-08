import { useNavigation } from "@react-navigation/core";
import { Seperator } from "@urbandhobi/components";
import { RefreshScrollView } from "@urbandhobi/components/pullrefresh";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Item from "./components/item";

interface AccountProps { }

const Account = ({ }: AccountProps) => {
  const { goBack } = useNavigation();

  const onOrderClick = React.useCallback(() => {

  }, []);

  const onChangePasswordClick = React.useCallback(() => {

  }, []);

  const onOffersClick = React.useCallback(() => {

  }, []);

  const onShareClick = React.useCallback(() => {

  }, []);

  const onLogoutClick = React.useCallback(() => {

  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <Appbar.Header theme={{ colors: { primary: "#fff" } }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Account setting" />
      </Appbar.Header>
      <RefreshScrollView>
        <View style={styles.section1}>
          <View style={styles.userInfoContainer}>
            <View style={styles.imageContainer}>
              <View style={{ width: "100%", height: "100%", backgroundColor: "#333" }} />
            </View>
            <View>
              <Text style={styles.name}>Rishav Garg</Text>
              <Text style={styles.contact}>{"7009581634"}, {"rishavgarg@gmail.com"}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Seperator style={{ height: 0.5, backgroundColor: "#666666" }} />
            <Item.Item>
              <Item.Content title="My Account" />
              <Item.Icon icon="keyboard-arrow-down" />
            </Item.Item>
            <Seperator style={{ height: 0.4, backgroundColor: "#666666" }} />
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
        </View>
      </RefreshScrollView>
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
