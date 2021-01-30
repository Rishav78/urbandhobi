import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../lib/constants";
import { AuthStackNavigation } from "./authstack.navigation";
import { shallowEqual, useSelector } from "react-redux";
import { RootReducerType } from "../@types";
import { HomeStackNavigation } from "./homestack.navigation";

const MainStack = createStackNavigator();

const { authStack, homeStack } = screens;

const isauthSelector = (state: RootReducerType) => state.auth.authenticated;

export const MainStackNavigation = () => {
  const isauthenticated = useSelector(isauthSelector, shallowEqual);
  console.log(isauthenticated)
  return (
    <MainStack.Navigator>
      {!isauthenticated ?
        <MainStack.Screen
          name={authStack.name}
          component={AuthStackNavigation}
          options={({ }) => ({
            headerShown: false,
          })}
        /> :
        <MainStack.Screen
          name={homeStack.name}
          component={HomeStackNavigation}
          options={({ }) => ({
            headerShown: false,
          })}
        />
      }
    </MainStack.Navigator>
  );
};
