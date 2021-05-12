import { Address, RootReducerType, Timings } from "@urbandhobi/@types";
import * as Timing from "./components/timingCart";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, Alert, Platform, SafeAreaView } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Service from "@urbandhobi/lib/service";
import MessageTile from "@urbandhobi/components/messageTile";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import { Appbar, FAB, TouchableRipple } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useAddress } from "@urbandhobi/hooks";
import { globalStyles, monthNames, theme } from "@urbandhobi/lib/constants";
import { AddressPicker } from "./components/address-picker";
import {Request} from "@urbandhobi/@types";

interface PickupTimmingProps { }

const HEADER_TITLE = Platform.select({ ios: "SCHEDULE ORDER", android: "Schedule order" });

const cartSelector = (state: RootReducerType) => state.cart;

const PickupTimming: React.FC<PickupTimmingProps> = () => {

  const params = useRoute().params as {payload: {request: Request}};

  const {request} = params.payload;

  const { cart } = useSelector(cartSelector, shallowEqual);
  const { navigateToHome } = useNavigate();
  const { goBack } = useNavigation();
  const { defaultAddress } = useAddress();

  const [FABVisible] = useState(true);
  const [timings, setTimings] = useState<Timings[]>([]);
  const [pickupDate, setPickupDate] = useState(0);
  const [pickupTiming, setPickupTiming] = useState<null | number>(null);
  const [address, setAddress] = useState<Address | null>(defaultAddress);
  const [showAddressPicker, setShowAddressPicker] = useState(false);

  const todayDate = new Date();
  const tomorrow = new Date(new Date().setDate(todayDate.getDate() + 1));
  const dayAfterTomorrow = new Date(new Date().setDate(todayDate.getDate() + 2));

  const onAddressSelect = useCallback((obj: Address) => {
    setAddress(obj);
    closeAddressPicker();
  }, []);

  const closeAddressPicker = useCallback(() => {
    setShowAddressPicker(false);
  }, []);

  const openAddressPicker = useCallback(() => {
    setShowAddressPicker(true);
  }, []);

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

  const scheduleRequest = useCallback(async () => {
    try {
      if (pickupTiming === null) {
        return Alert.alert("", "SELECT PICKUP TIMING");
      }
      if (!address) {
        return Alert.alert("", "SELECT ADDRESS");
      }
      const date = pickupDate === 0 ? todayDate : pickupDate === 1 ? tomorrow : dayAfterTomorrow;
      const res = await new Service().laundry().schedule(request.id, {timingId: pickupTiming, addressId: address.id, pickupDate: date});
      if (res) {
        Alert.alert("Scheduled!! Thank you", "", [
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
  }, [cart, pickupDate, pickupTiming, address]);

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
    const res = await new Service().services().timings();
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
    <SafeAreaView style={globalStyles.safearea}>
      <Appbar.Header style={globalStyles.headerContainer} theme={theme.light}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={HEADER_TITLE} />
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
                  sh = appendZero(sh - (sh === 12 ? 0 : 12));
                }

                if (eh < 12) {
                  end = "am";
                  eh = appendZero(eh);
                }
                else {
                  end = "pm";
                  eh = appendZero(eh - (eh === 12 ? 0 : 12));
                }

                const text = `${sh}:${sm} ${start} to ${eh}:${em} ${end}`;
                return (
                  <Timing.Block
                    key={timing.id}
                    text={text}
                    fill={pickupTiming === timing.id}
                    style={styles.timingBlock}
                    onPress={selectTiming(timing.id)} />
                );
              }) :
              <MessageTile style={globalStyles.message} message="NO TIMING AVAILABLE FOR THIS DATE" />
          }
        </Timing.Section>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: wp("5%") }}>Address</Text>
        <View style={styles.addressContainer}>
          <TouchableRipple onPress={openAddressPicker}>
            {address ?
              <View style={{ paddingHorizontal: wp("1%"), paddingVertical: wp("2%") }}>
                <Text style={styles.email}>{address.email}</Text>
                <Text>{address.houseno}, {address.locality}, {address.city}, {address.state} {address.postalCode}</Text>
              </View> :
              <MessageTile style={globalStyles.message} message="No address selected" />
            }
          </TouchableRipple>
        </View>
      </View>
      <FAB
        onPress={scheduleRequest}
        visible={FABVisible}
        style={styles.fab}
        color="#333"
        icon={FABIcon} />
      <AddressPicker onRequestClose={closeAddressPicker} animationType="slide" visible={showAddressPicker} onSelect={onAddressSelect} />
    </SafeAreaView>
  );
};

export default PickupTimming;

const FABIcon = () => (
  <MaterialCommunityIcons name="cart-arrow-up" size={24} color="#fff" />
);

const styles = StyleSheet.create({
  safearea: {

  },
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#333",
  },
  addressContainer: {
    borderRadius: 2,
    overflow: "hidden",
  },
  timingBlock: {
    marginVertical: wp("2%"),
    width: wp("44%"),
  },
  email:{
    fontSize: wp("4.5%"),
    fontWeight: "bold",
  },
});
