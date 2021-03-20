import React, { memo, useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Clickable } from "./click";
import AntDesign from "react-native-vector-icons/AntDesign";

export interface CounterProps {
  onCounterPlus?: (count: number) => boolean;
  onCounterMinus?: (count: number) => boolean;
  value?: number;
}

export const Counter: React.FC<CounterProps> = ({
  onCounterPlus,
  onCounterMinus,
  value
}) => {

  const [count, setCount] = useState(0);

  const currentCount = typeof value === "number" ? value : count;

  const onCountPlus = useCallback(() => {

    if (typeof value === "number") {
      if (onCounterPlus) {
        onCounterPlus(value + 1);
      }
      return;
    }

    if (onCounterPlus) {
      if (onCounterPlus(count + 1)) {
        setCount(state => (state + 1));
      }
    }
    else {
      setCount(state => (state + 1));
    }
  }, [value]);

  const onCountMinus = useCallback(() => {

    if (typeof value === "number") {
      if (onCounterMinus) {
        onCounterMinus(value - 1);
      }
      return;
    }

    if (onCounterMinus) {
      if ((count - 1) >= 0 && onCounterMinus(count - 1)) {
        setCount(state => (state === 0 ? state : state - 1));
      }
    }
    else {
      setCount(state => (state === 0 ? state : state - 1));
    }
  }, [count, value]);

  return (
    <View style={styles.container}>
      {
        currentCount !== 0 ?
          <>
            <Clickable onPress={onCountMinus} style={styles.minus}>
              <AntDesign name="minus" size={15} color="#ff3333" />
            </Clickable>
            <View style={styles.count}>
              <Text>{currentCount}</Text>
            </View>
            <Clickable onPress={onCountPlus} style={styles.plus}>
              <AntDesign name="plus" size={15} color="#00e600" />
            </Clickable>
          </> :
          <Clickable onPress={onCountPlus} style={styles.addContainer}>
            <Text style={styles.add}>ADD</Text>
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
  minus: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  add: {
    fontSize: 16,
    color: "#00e600",
  },
});
