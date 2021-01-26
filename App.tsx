/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigation } from "./src/navigation";

const App: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <MainStackNavigation />
    </NavigationContainer>
  );
};

export default App;
