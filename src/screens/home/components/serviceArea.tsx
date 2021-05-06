import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CardView from "@urbandhobi/components/cardview";
import City from "./city";
import { useService } from "@urbandhobi/hooks/service.hook";

export const ServiceArea = () => {

  const {serviceStates, getServiceStates} = useService();

  useEffect(() => {
    getServiceStates();
  }, []);

  return (
    <CardView style={styles.card}>
      <Text style={styles.title}>Service Areas</Text>
      {
        serviceStates &&
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal>
          {
            serviceStates.map(area => (
              <City
                key={area.image}
                image={area.image}
                name={area.name}
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
