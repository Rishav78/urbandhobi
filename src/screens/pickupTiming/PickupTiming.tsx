import { RootReducerType, Timings } from "@urbandhobi/@types";
import * as Timing from "./components/timingCart";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Service from "@urbandhobi/lib/service";
import MessageTile from "@urbandhobi/components/messageTile";
import { Button } from "@urbandhobi/components";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setCart } from "@urbandhobi/redux/cart/cart.action";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import { Appbar } from "react-native-paper";

interface PickupTimmingProps { }

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const cartSelector = (state: RootReducerType) => state.cart;

const PickupTimming: React.FC<PickupTimmingProps> = ({

}) => {
  const { cart } = useSelector(cartSelector, shallowEqual);
  const dispatch = useDispatch();
  const {navigateToHome} = useNavigate();

  const [timings, setTimings] = useState<Timings[]>([]);
  const [pickupDate, setPickupDate] = useState(0);
  const [pickupTiming, setPickupTiming] = useState<null | number>(null);

  const todayDate = new Date();
  const tomorrow = new Date(new Date().setDate(todayDate.getDate() + 1));
  const dayAfterTomorrow = new Date(new Date().setDate(todayDate.getDate() + 2));

  const filteredTimings = useMemo(() => (
    timings.filter(timing => {
      let date = new Date();
      if (pickupDate !== 0) {
        date = new Date(`${new Date().getDate() + pickupDate}/${new Date().getMonth()}/${new Date().getFullYear()}`);
      }
      const [hh] = timing.start.split(".");
      if (date.getHours() > Number(hh)) {
        return false;
      }
      return true;
    })
  ), [timings, pickupDate, todayDate]);

  const submitCart = useCallback(async () => {
    try {
      if (pickupTiming === null) {
        return Alert.alert("", "SELECT PICKUP TIMING");
      }

      const newCart = await new Service().laundry().request(pickupTiming);
      if (newCart) {
        dispatch(setCart(newCart));
        Alert.alert("Requested!! Thank you", "", [
          {
            onPress: navigateToHome,
            text: "Ok",
          },
        ]);
      }
    }
    catch (error) {
      console.log(error);
    }
  }, [cart, pickupDate, pickupTiming]);

  const selectDate = (date: number) => {
    return () => {
      setPickupTiming(null);
      setPickupDate(date);
    };
  };

  const selectTiming = (timing: number) => {
    return () => {
      setPickupTiming(timing);
    };
  };

  const fetchTimings = async () => {
    const res = await new Service().laundry().timings();
    if (res) {
      setTimings(res);
    }
  };

  const appendZero = (number: number | string) => {
    number = Number(number);
    if (number < 10) {
      return "0" + number.toString();
    }
    return number.toString();
  };

  const getDate = (date: Date) => {
    const d = date.getDate();
    return appendZero(d);
  };

  const getMonthName = (date: Date) => {
    return monthNames[date.getMonth()];
  };

  useEffect(() => {
    fetchTimings();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Appbar.Header theme={{colors: {primary: "#fff"}}}>
        <Appbar.BackAction />
        <Appbar.Content title="Pickup timing" />
      </Appbar.Header>

      <View style={styles.section}>
        <Text style={{ fontSize: wp("5%") }}>Select Pickup Date</Text>
        <Timing.Section style={{ marginVertical: wp("3%") }}>
          <Timing.Block
            fill={pickupDate === 0}
            text={`Today, ${getDate(todayDate)} ${getMonthName(todayDate)}`}
            onPress={selectDate(0)} />

          <Timing.Block
            fill={pickupDate === 1}
            text={`Tomorrow, ${getDate(tomorrow)} ${getMonthName(tomorrow)}`}
            onPress={selectDate(1)} />

          <Timing.Block
            fill={pickupDate === 2}
            text={`${getDate(dayAfterTomorrow)} ${getMonthName(dayAfterTomorrow)}`}
            onPress={selectDate(2)} />
        </Timing.Section>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: wp("5%") }}>Select Pickup Timing</Text>
        <Timing.Section style={{ marginVertical: wp("3%") }}>
          {
            filteredTimings.length > 0 ?
              filteredTimings.map(timing => {
                let [sh, sm = 0]: (number | string)[] = timing.start.split(".").map(e => Number(e));
                let [eh, em = 0]: (number | string)[] = timing.end.split(".").map(e => Number(e));

                let start: string, end: string;
                sm = appendZero(sm);
                em = appendZero(em);

                if (sh < 12) {
                  start = "am";
                  sh = appendZero(sh);
                }
                else {
                  start = "pm";
                  sh = appendZero(sh - (sh === 12 ?  0 : 12));
                }

                if (eh < 12) {
                  end = "am";
                  eh = appendZero(eh);
                }
                else {
                  end = "pm";
                  eh = appendZero(eh - (eh === 12 ?  0 : 12));
                }

                const text = `${sh}:${sm} ${start} to ${eh}:${em} ${end}`;
                return (
                  <Timing.Block
                    key={timing.id}
                    text={text}
                    fill={pickupTiming === timing.id}
                    style={{ marginVertical: wp("2%") }}
                    onPress={selectTiming(timing.id)} />
                );
              }) :
              <MessageTile style={styles.message} message="NO TIMING AVAILABLE FOR THIS DATE" />
          }
        </Timing.Section>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={submitCart} activeOpacity={1} title="SUBMIT" />
      </View>
    </SafeAreaView>
  );
};

export default PickupTimming;

const styles = StyleSheet.create({
  container: {},
  section: {
    paddingHorizontal: wp("5%"),
    backgroundColor: "#fff",
    paddingVertical: hp("2%"),
    marginVertical: wp("2%"),
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: wp("3%"),
  },
  message: {
    elevation: 10,
    flex: 1,
    backgroundColor: "#fff",
    marginTop: hp("1%"),
    paddingVertical: hp("2%"),
    marginHorizontal: wp("3%"),
    borderRadius: wp("2%"),
  },
});
