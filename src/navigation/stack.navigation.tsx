import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { SigninWithEmailScreen } from "../screens/authentication/signin";
import { AuthHeaderRight } from "../screens/authentication/components/header.auth";

import {styles as signinHeaderStyles} from "../screens/authentication/components";

const MainStack = createStackNavigator();

export const MainStackNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={screens.signin.name}
        component={SigninWithEmailScreen}
        options={({}) => ({
          headerTitle: screens.signin.title,
          headerRight: AuthHeaderRight,
          headerStyle: signinHeaderStyles.container,
        })}
      />
    </MainStack.Navigator>
  );
};
