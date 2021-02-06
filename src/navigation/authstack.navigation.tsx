import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { SigninWithEmailScreen, StartingScreen } from "../screens";

import { SignupWithEmailScreen } from "../screens/authentication/signup";

const AuthStack = createStackNavigator();

const {authStack: {screen}} = screens;

export const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown:  false}}>
      <AuthStack.Screen
        name={screen.starting.name}
        component={StartingScreen}
      />
      <AuthStack.Screen
        name={screen.signin.name}
        component={SigninWithEmailScreen}
      />
      <AuthStack.Screen
        name={screen.signup.name}
        component={SignupWithEmailScreen}
      />
    </AuthStack.Navigator>
  );
};
