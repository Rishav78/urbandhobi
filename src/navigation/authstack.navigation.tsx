import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { SigninWithEmailScreen, StartingScreen } from "../screens/authentication";

import {styles as authHeaderStyles} from "../screens/authentication/components";
import { SignupWithEmailScreen } from "../screens/authentication/signup";

const AuthStack = createStackNavigator();

const {authStack: {screen}} = screens;

export const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={screen.starting.name}
        component={StartingScreen}
        options={({}) => ({
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name={screen.signin.name}
        component={SigninWithEmailScreen}
        options={({}) => ({
          headerTitle: screen.signin.title,
          headerStyle: authHeaderStyles.container,
        })}
      />
      <AuthStack.Screen
        name={screen.signup.name}
        component={SignupWithEmailScreen}
        options={({}) => ({
          headerTitle: screen.signup.title,
          headerStyle: authHeaderStyles.container,
        })}
      />
    </AuthStack.Navigator>
  );
};
