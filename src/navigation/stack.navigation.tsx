import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { SigninWithEmailScreen } from "../screens/signin";

const MainStack = createStackNavigator();

export const MainStackNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={screens.signin.name}
        component={SigninWithEmailScreen}
        options={({}) => ({
          headerTitle: screens.signin.title,
        })}
      />
    </MainStack.Navigator>
  );
};
