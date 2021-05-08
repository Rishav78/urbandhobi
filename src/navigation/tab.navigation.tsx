import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigation } from "./homestack.navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Tab = createBottomTabNavigator();

type BottomTabType = "HOMETAB" | "ORDERTAB" | "ACCOUNTTAB" | "HELPTAB" | "NOTIFICATIONTAB";

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName: string;
          const routeName: BottomTabType = route.name as any;
          const color = focused ? "#333" : "#595959";
          switch (routeName) {
            case "HOMETAB":
              iconName = "home";
              break;
            case "ORDERTAB":
              iconName = "shopping-bag";
              break;
            case "ACCOUNTTAB":
              iconName = "account-circle";
              break;
            case "HELPTAB":
              iconName = "help";
              break;
            case "NOTIFICATIONTAB":
              iconName = "notifications";
              break;
          }
          return (
            <MaterialIcons
              style={styles.icon}
              name={iconName}
              size={24}
              color={color} />
          );
        },
      })}>
      <Tab.Screen
        name="HOMETAB"
        options={{ title: "Home" }}
        component={HomeStackNavigation} />
      <Tab.Screen
        name="ORDERTAB"
        options={{ title: "Orders" }}
        component={HomeStackNavigation} />
      <Tab.Screen
        name="ACCOUNTTAB"
        options={{ title: "Account" }}
        component={HomeStackNavigation} />
      <Tab.Screen
        name="NOTIFICATIONTAB"
        options={{ title: "Notification" }}
        component={HomeStackNavigation} />
      <Tab.Screen
        name="HELPTAB"
        options={{ title: "Help" }}
        component={HomeStackNavigation} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: wp("2%"),
  },
});

export default BottomTabNavigation;
