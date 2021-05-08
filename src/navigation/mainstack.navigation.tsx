import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "@urbandhobi/lib/constants";
import { AuthStackNavigation } from "./authstack.navigation";
import { shallowEqual, useSelector } from "react-redux";
import { RootReducerType } from "@urbandhobi/@types";
import SplashScreen from "@urbandhobi/screens/SplashScreen";
import BottomTabNavigation from "./tab.navigation";
import { AddAddress } from "@urbandhobi/screens";

const MainStack = createStackNavigator();

const { authStack, homeStack, splash } = screens;

const isauthSelector = (state: RootReducerType) => state.auth.authenticated;
const isVerifiedSelector = (state: RootReducerType) => state.auth.verified;

export const MainStackNavigation = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const isauthenticated = useSelector(isauthSelector, shallowEqual);
  const isverified = useSelector(isVerifiedSelector, shallowEqual);

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 1000);
  }, []);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      { showSplash &&
        <MainStack.Screen
          name={splash.name}
          component={SplashScreen}
          options={({ }) => ({
            headerShown: false,
          })}
        />
      }
      {!isauthenticated || !isverified ?
        <MainStack.Screen
          name={authStack.name}
          component={AuthStackNavigation}
          options={({ }) => ({
            headerShown: false,
          })}
        /> :
        <>
          <MainStack.Screen
            name={homeStack.name}
            component={BottomTabNavigation}
            options={({ }) => ({
              headerShown: false,
            })}
          />
          <MainStack.Screen
            name={homeStack.screen.addAddress.name}
            component={AddAddress}
          />
        </>
      }
    </MainStack.Navigator>
  );
};
