import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { SigninWithEmailScreen, StartingScreen } from "../screens/authentication";
import { AuthHeaderRight } from "../screens/authentication/components/header.auth";

import {styles as authHeaderStyles} from "../screens/authentication/components";
import { SignupWithEmailScreen } from "../screens/authentication/signup";

const MainStack = createStackNavigator();

export const MainStackNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={screens.starting.name}
        component={StartingScreen}
        options={({}) => ({
          headerShown: false,
        })}
      />
      <MainStack.Screen
        name={screens.signin.name}
        component={SigninWithEmailScreen}
        options={({}) => ({
          headerTitle: screens.signin.title,
          headerRight: AuthHeaderRight,
          headerStyle: authHeaderStyles.container,
        })}
      />
      <MainStack.Screen
        name={screens.signup.name}
        component={SignupWithEmailScreen}
        options={({}) => ({
          headerTitle: screens.signup.title,
          headerRight: AuthHeaderRight,
          headerStyle: authHeaderStyles.container,
        })}
      />
    </MainStack.Navigator>
  );
};
