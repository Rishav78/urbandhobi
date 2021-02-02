import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../../@types";
import { getAvailableStates } from "../../../actions";
import CardView from "../../../components/cardview";
import { setServiceState } from "../../../redux/home/home.action";
import City from "./city";

const serviceStateSeclector = (state: RootReducerType) => state.home.serviceState;

export const ServiceArea = () => {

  const dispatch = useDispatch();
  const serviceArea = useSelector(serviceStateSeclector, shallowEqual);

  const getServiceArea = useCallback(async () => {
    const states = await getAvailableStates();
    if (states) {
      dispatch(setServiceState(states));
    }
  }, []);

  useEffect(() => {
    if (!serviceArea) {
      getServiceArea();
    }
  }, []);

  return (
    <CardView style={styles.card}>
      <Text style={styles.title}>Service Areas</Text>
      {
        serviceArea &&
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal>
          {
            serviceArea.map(area => (
              <City
                key={area.image.id}
                image={area.image.url}
                name={area.state}
              />
            ))
          }
        </ScrollView>
      }
    </CardView>
  );
};

export default ServiceArea;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: "#fff",
    paddingVertical: wp("2%"),
    borderRadius: 5,
  },
  title: {
    marginHorizontal: wp("4%"),
    marginBottom: wp("2%"),
    fontSize: wp("4.5%"),
  },
});
