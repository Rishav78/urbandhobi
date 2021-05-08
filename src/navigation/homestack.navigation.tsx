import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { Address, AddAddress, HomeScreen, ServiceScreen } from "@urbandhobi/screens";
import Cart from "@urbandhobi/screens/cart/Cart";
import PickupTimming from "@urbandhobi/screens/pickupTiming/PickupTiming";

const HomeStack = createStackNavigator();

const { homeStack: { screen } } = screens;

export const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name={screen.home.name}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name={screen.address.name}
        component={Address}
      />
      <HomeStack.Screen
        name={screen.service.name}
        component={ServiceScreen}
      />
      <HomeStack.Screen
        name={screen.cart.name}
        component={Cart}
      />
      <HomeStack.Screen
        name={screen.pickupTiming.name}
        component={PickupTimming}
      />
    </HomeStack.Navigator>
  );
};
