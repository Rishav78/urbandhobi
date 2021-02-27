import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import {Address, AddAddress, HomeScreen} from "@urbandhobi/screens";
import Laundry from "@urbandhobi/screens/laundry/Laundry";

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
      <HomeStack.Screen
        name={screen.addAddress.name}
        component={AddAddress}
      />
      <HomeStack.Screen
        name={screen.laundry.name}
        component={Laundry}
      />
    </HomeStack.Navigator>
  );
};
