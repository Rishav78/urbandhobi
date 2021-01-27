import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { AuthStackNavigation } from "./authstack.navigation";

const MainStack = createStackNavigator();

const {authStack: {name}} = screens;

export const MainStackNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={name}
        component={AuthStackNavigation}
        options={({}) => ({
          headerShown: false,
        })}
      />
    </MainStack.Navigator>
  );
};
