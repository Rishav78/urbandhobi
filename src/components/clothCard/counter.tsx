import React, { memo, useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Clickable } from "../click";
import AntDesign from "react-native-vector-icons/AntDesign";

export interface CounterProps {

}

export const Counter: React.FC<CounterProps> = () => {

  const [count, setCount] = useState(0);
  const [enable, setEnable] = useState(false);

  const onCountPlus = useCallback(() => {
    setCount(state => (state + 1));
  }, [count]);

  const onCountMinus = useCallback(() => {
    setCount(state => (state === 0 ? state : state - 1));
  }, [count]);

  const enableButton = useCallback(() => {
    setEnable(true);
  }, []);

  return (
    <View style={styles.container}>
      {
        enable ?
          <>
            <Clickable onPress={onCountMinus} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <AntDesign name="minus" size={15} color="#ff3333" />
            </Clickable>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>{count}</Text>
            </View>
            <Clickable onPress={onCountPlus} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <AntDesign name="plus" size={15} color="#00e600" />
            </Clickable>
          </> :
          <Clickable onPress={enableButton} style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text style={{fontSize: 16, color:"#00e600"}}>ADD</Text>
          </Clickable>
      }
    </View>
  );
};

export default memo(Counter);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
