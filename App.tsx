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
import { Provider } from "react-redux";
import { MainStackNavigation } from "./src/navigation";
import { store, persistor } from "./src/redux";
import { PersistGate } from "redux-persist/es/integration/react";

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStackNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
