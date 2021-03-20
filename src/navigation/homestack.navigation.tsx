import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import {Address, AddAddress, HomeScreen} from "@urbandhobi/screens";
import WashAndFold from "@urbandhobi/screens/laundry/WashAndFold";
import Wash from "@urbandhobi/screens/laundry/Wash";
import WashAndIron from "@urbandhobi/screens/laundry/WashAndIron";
import Cart from "@urbandhobi/screens/cart/Cart";

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
      {/* laundry screens */}
      <HomeStack.Screen
        name={screen.wash.name}
        component={Wash}
      />
      <HomeStack.Screen
        name={screen.washAndFold.name}
        component={WashAndFold}
      />
      <HomeStack.Screen
        name={screen.washAndIron.name}
        component={WashAndIron}
      />

      <HomeStack.Screen
        name={screen.cart.name}
        component={Cart}
      />
    </HomeStack.Navigator>
  );
};
