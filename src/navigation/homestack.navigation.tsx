import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { HomeScreen } from "../screens/home";
import Address from "../screens/address/Address";

const HomeStack = createStackNavigator();

const {homeStack: {screen}} = screens;

export const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name={screen.home.name}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name={screen.address.name}
        component={Address}
      />
    </HomeStack.Navigator>
  );
};
