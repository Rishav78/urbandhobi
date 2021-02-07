import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "@urbandhobi/lib/constants";
import {
  SigninWithEmailScreen,
  StartingScreen,
  SignupWithEmailScreen,
} from "@urbandhobi/screens";

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
