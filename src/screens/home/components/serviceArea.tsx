import React from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CardView from "../../../components/cardview";
import City from "./city";

const data = [
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
  {
    image: "https://images.livemint.com/img/2019/07/11/600x338/c3172c68-a0a5-11e9-be64-50de38257690_1562520262406_1562851478661.jpg",
    name: "Bhubaneswar",
  },
];

export const ServiceArea = () => {
  return (
    <CardView style={styles.card}>
      <Text style={styles.title}>Service Areas</Text>
      <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal>
        {
          data.map(city => <City key={Math.random().toString()} data={city} />)
        }
      </ScrollView>
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
