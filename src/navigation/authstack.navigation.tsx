import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "@urbandhobi/lib/constants";
import {
  SigninWithEmailScreen,
  StartingScreen,
  SignupWithEmailScreen,
} from "@urbandhobi/screens";
import { UserInformation } from "@urbandhobi/screens/authentication/UserInformation";
import { RootReducerType } from "@urbandhobi/@types";
import { shallowEqual, useSelector } from "react-redux";

const AuthStack = createStackNavigator();

const { authStack: { screen } } = screens;
const isauthSelector = (state: RootReducerType) => state.auth.authenticated;

export const AuthStackNavigation = () => {
  const isauthenticated = useSelector(isauthSelector, shallowEqual);
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {!isauthenticated &&
        <>
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
        </>
      }
      <AuthStack.Screen
        name={screen.userinfo.name}
        component={UserInformation}
      />
    </AuthStack.Navigator>
  );
};
